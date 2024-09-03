import React, {useEffect, useRef, useState} from "react";
import {Table, Tooltip, Row, Col, message, Space, Spin} from "antd";
import {MinusCircleOutlined,PlayCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {deleteSuccessReturnCurrenPage,debounce} from "../../../common/utils/Client";
import ListEmpty from "../../../common/component/list/ListEmpty";
import Profile from "../../../common/component/profile/Profile";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import Page from "../../../common/component/page/Page";
import ListAction from "../../../common/component/list/ListAction";
import PipelineDrawer from "../../../common/component/drawer/Drawer";
import HistoryScreen from "./HistoryScreen";
import HistoryRunDetail from "./HistoryRunDetail";
import {runStatusIcon,runStatusText} from "./HistoryCommon";
import historyStore from "../store/HistoryStore";
import pipelineStore from "../../pipeline/store/PipelineStore";
import pip_trigger from "../../../assets/images/svg/pip_trigger.svg";
import "./History.scss";

const pageSize = 13;

/**
 * 历史列表
 * @param props
 * @returns {Element}
 * @constructor
 */
const History = props =>{

    const {match,route} = props

    const {findOnePipeline} = pipelineStore;

    const {findUserInstance,findPipelineInstance,deleteInstance,execStart,execStop,setHistoryList,page,historyList} = historyStore;

    const intervalRef = useRef(null);

    //历史信息
    const [historyItem,setHistoryItem] = useState(null);
    //加载状态
    const [isLoading,setIsLoading] = useState(false);
    //历史运行阶段详情状态
    const [runVisible,setRunVisible] = useState(false);

    const pageParam = {
        pageSize: pageSize,
        currentPage: 1,
    }

    // 获取历史列表请求数据
    const [params,setParams] = useState(
        route.path==='/history' ?
            {
                pageParam,
                pipelineId:null,
                state:null,
                type:0
            }
            :
            {
                pageParam,
                userId:null,
                state:null,
                type:0
            }
    )

    useEffect(() => {
        return ()=>{
            setHistoryList([]);
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(()=>{
        setIsLoading(true);
        findInstance();
    },[params,match.params.id])

    /**
     * 获取历史列表
     */
    const findInstance = () => {
        if(route.path==='/history'){
            findUserInstance(params).then(Res=>{
                setIsLoading(false)
                if(Res.code===0){
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        return
                    }
                    findInter()
                }
            })
        } else {
            findPipelineInstance({
                ...params,
                pipelineId:match.params.id,
            }).then(Res=>{
                setIsLoading(false)
                if(Res.code===0){
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        return
                    }
                    findInter()
                }
            })
        }
    }

    /**
     * 开启定时器
     */
    const findInter = () => {
        clearInterval(intervalRef.current);
        if(route.path==='/history'){
            intervalRef.current = setInterval(()=>{
                findUserInstance(params).then(Res=>{
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        clearInterval(intervalRef.current)
                    }
                })
            },1000)
        } else {
            intervalRef.current = setInterval(()=>{
                findPipelineInstance({
                    ...params,
                    pipelineId:match.params.id,
                }).then(Res=>{
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        clearInterval(intervalRef.current)
                    }
                })
            },1000)
        }
    }

    /**
     * 切换列表详情页面
     * @param record
     */
    const details = record => {
        clearInterval(intervalRef.current);
        setHistoryItem(record);
        setRunVisible(true);
    }

    /**
     * 筛选
     * @param value
     */
    const screen = value =>{
        setParams({
            ...params,
            ...value,
        })
    }

    /**
     * 换页
     */
    const changPage = pages =>{
        if(pages==='reset'){
            setParams({pageParam})
        } else {
            screen({
                pageParam:{
                    pageSize: pageSize,
                    currentPage: pages,
                }
            })
        }
    }

    /**
     * 删除历史
     * @param record
     */
    const del = record =>{
        deleteInstance(record.instanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(page.totalRecord,pageSize,params.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 运行开启或终止
     */
    const terminateOperation = debounce(record => {
        setIsLoading(true);
        const {runStatus,pipeline} = record
        if(runStatus==="run"){
            execStop(pipeline.id).then(res=>{
                setIsLoading(false)
            })
        } else {
            findOnePipeline(pipeline.id).then(res=>{
                if(res.code===0){
                    if(res.data.state===2){
                        message.info("当前流水线正在在运行！",0.5,()=>setIsLoading(false))
                    } else {
                        execStart({
                            pipelineId:pipeline.id
                        }).then(res=>{
                            if(res.code===0) {
                                details(res.data)
                            }
                            setIsLoading(false)
                        })
                    }
                }
            })
        }
    },1000)

    const columns = [
        {
            title: "名称",
            dataIndex: "findNumber",
            key: "findNumber",
            width:"22%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span className="history-table-name" onClick={()=>details(record)}>
                        {
                            route.path==='/history' &&
                            <span className="history-table-pipeline">{record.pipeline && record.pipeline.name}</span>
                        }
                        <span className="history-table-findNumber"> # {text}</span>
                    </span>
                )
            }
        },
        {
            title: "状态",
            dataIndex: "runStatus",
            key: "runStatus",
            width:"10%",
            ellipsis:true,
            render:(text,record) => (
                <Tooltip title={runStatusText(record.runStatus)}>
                    {runStatusIcon(record.runStatus)}
                </Tooltip>
            )
        },
        {
            title: "触发信息",
            dataIndex: "runWay",
            key: "runWay",
            width:"23%",
            ellipsis:true,
            render:(text,record) => (
                <div className="history-table-runWay">
                    {
                        text===1?
                            <>
                                <Profile userInfo={record?.user}/>
                                <div className="runWay-user">{record?.user?.nickname || "--"}手动触发</div>
                            </>
                            :
                            <>
                                <img src={pip_trigger} alt={'trigger'} style={{width:22,height:22}}/>
                                <div className="runWay-user">定时任务自动触发</div>
                            </>
                    }
                </div>
            )
        },
        {
            title: "开始",
            dataIndex: "createTime",
            key: "createTime",
            width:"20%",
            ellipsis:true,
        },
        {
            title: "耗时",
            dataIndex: "runTimeDate",
            key: "runTimeDate",
            width:"15%",
            ellipsis:true,
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(_,record)=> {
                switch (record.runStatus) {
                    case "run":
                        return (
                            <Tooltip title={"终止"}>
                                <span onClick={()=>terminateOperation(record)}>
                                    <MinusCircleOutlined style={{cursor:"pointer",fontSize:16}}/>
                                </span>
                            </Tooltip>
                        )
                    default:
                        return (
                            <Space size='middle'>
                                <Tooltip title={"运行"} >
                                    <span onClick={()=>terminateOperation(record)}>
                                        <PlayCircleOutlined style={{cursor:"pointer",fontSize:16}}/>
                                    </span>
                                </Tooltip>
                                <ListAction del={()=>del(record)}/>
                            </Space>
                        )
                }
            }
        }
    ]

    /**
     * 退出
     */
    const goBack = () => {
        setRunVisible(false);
        setHistoryItem(null);
        findInstance();
    }

    return (
        <Row className="history">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb firstItem={"历史"}/>
                    <HistoryScreen {...props} screen={screen}/>
                    <Spin spinning={isLoading}>
                        <div className="history-table">
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={historyList}
                                rowKey={record=>record.instanceId}
                                pagination={false}
                                locale={{emptyText: <ListEmpty />}}
                            />
                            <Page
                                currentPage={page.currentPage}
                                changPage={changPage}
                                page={page}
                            />
                        </div>
                    </Spin>
                </div>
                <PipelineDrawer
                    width={"75%"}
                    visible={runVisible}
                    onClose={goBack}
                >
                    <HistoryRunDetail
                        back={goBack}
                        historyType={"drawer"}
                        historyItem={historyItem}
                        setHistoryItem={setHistoryItem}
                    />
                </PipelineDrawer>
            </Col>
        </Row>
    )
}

export default observer(History)
