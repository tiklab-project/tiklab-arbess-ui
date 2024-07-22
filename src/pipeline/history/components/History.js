import React, {useEffect,useState} from "react";
import {Table, Tooltip, Row, Col, message, Space} from "antd";
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
import HistoryDetail from "./HistoryDetail";
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

    const {findOnePipeline} = pipelineStore

    const {findUserInstance,findPipelineInstance,deleteInstance,execStart,execStop,page,historyList,setHistoryList} = historyStore

    //历史信息
    const [historyItem,setHistoryItem] = useState(null)
    //加载状态
    const [isLoading,setIsLoading] = useState(false)
    //历史详情状态 && 监听关闭定时器的状态
    const [detail,setDetail] = useState(false)

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

    useEffect(()=>{
        return ()=>{
            setHistoryList([])
            clearInterval(inters)
        }
    },[])

    let inters=null
    useEffect(()=>{
        if(detail){
            clearInterval(inters)
        }else {
            findInstance()
        }
    },[detail,params,match.params.id])

    /**
     * 获取历史列表
     */
    const findInstance = () => {
        setIsLoading(true)
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
            return
        }
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

    /**
     * 开启定时器
     */
    const findInter = () => {
        clearInterval(inters)
        if(route.path==='/history'){
            inters = setInterval(()=>{
                findUserInstance(params).then(Res=>{
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        clearInterval(inters)
                    }
                })
            },1000)
        }else {
            inters = setInterval(()=>{
                findPipelineInstance({
                    ...params,
                    pipelineId:match.params.id,
                }).then(Res=>{
                    if(!Res.data || Res.data.dataList.length<1 || Res.data.dataList[0].runStatus!=="run"){
                        clearInterval(inters)
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
        setDetail(true)
        setHistoryItem(record)
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
        screen({
            pageParam:{
                pageSize: pageSize,
                currentPage: pages,
            }
        })
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
        const {runStatus,pipeline} = record
        if(runStatus==="run"){
            execStop(pipeline.id).then()
            return
        }
        findOnePipeline(pipeline.id).then(res=>{
            if(res.code===0){
                if(res.data.state===2){
                    return message.info("当前流水线正在在运行！")
                }
                execStart({
                    pipelineId:pipeline.id
                }).then(res=>{
                    if(res.code===0){
                        details(res.data)
                    }
                })
            }
        })
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
        setDetail(false)
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
                <div className="mf-home-limited mf">
                    <BreadCrumb firstItem={"历史"}/>
                    <HistoryScreen
                        {...props}
                        screen={screen}
                        pipelineStore={pipelineStore}
                    />
                    <div className="history-table">
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={historyList}
                            rowKey={record=>record.instanceId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty title={"没有查询到历史记录"}/>}}
                        />
                        <Page
                            currentPage={page.currentPage}
                            changPage={changPage}
                            page={page}
                        />
                    </div>
                </div>
                <PipelineDrawer
                    width={"75%"}
                    visible={detail}
                    onClose={goBack}
                    mask={false}
                    requireRef={true}
                >
                    <HistoryDetail
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
