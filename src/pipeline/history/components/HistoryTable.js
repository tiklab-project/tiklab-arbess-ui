import React, {useState} from "react";
import {Table, Tooltip, Row, Col, message} from "antd";
import {MinusCircleOutlined,PlayCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {deleteSuccessReturnCurrenPage,debounce} from "../../../common/utils/Client";
import EmptyText from "../../../common/component/emptyText/EmptyText";
import Profile from "../../../common/component/profile/Profile";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import Page from "../../../common/component/page/Page";
import ListAction from "../../../common/component/list/Listaction";
import PipelineDrawer from "../../../common/component/drawer/Drawer";
import DiskModal from "../../../common/component/modal/DiskModal";
import HistoryScreen from "./HistoryScreen";
import HistoryDetail from "./HistoryDetail";
import {runStatusIcon,runStatusText} from "./HistoryTrigger";
import pip_trigger from "../../../assets/images/svg/pip_trigger.svg";
import "./HistoryTable.scss";

const HistoryTable = props =>{

    const {historyType,isLoading,setIsLoading,detail,setDetail,params,setParams,
        historyStore,pipelineStore
    } = props

    const {findOnePipeline} = pipelineStore

    const {page,historyList,deleteInstance,execStart,execStop} = historyStore

    // 历史信息
    const [historyItem,setHistoryItem] = useState(null)

    // 磁盘空间状态弹出框
    const [diskVisible,setDiskVisible] = useState(false)

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
        setIsLoading(true)
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
                pageSize: 13,
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
                const current = deleteSuccessReturnCurrenPage(page.totalRecord,13,params.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 终止运行
     */
    const terminateOperation = debounce(record => {
        const {runStatus,pipeline} = record
        if(runStatus==="run"){
            execStop(pipeline.id)
            return
        }
        findOnePipeline(pipeline.id).then(res=>{
            if(res.code===0){
                if(res.data.state===2){
                    return message.info("当前流水线正在在运行！")
                }
                execStart(pipeline.id).then(res=>{
                    if(res.code===0) return details(res.data)
                    if(res.code===9000) return setDiskVisible(true)
                })
            }
        })
    },1000)

    const columns = [
        {
            title: "名称",
            dataIndex: "findNumber",
            key: "findNumber",
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                return <span className="history-table-name" onClick={()=>details(record)}>
                            {
                                historyType==="history" &&
                                <span className="history-table-pipeline">{record.pipeline && record.pipeline.name}</span>
                            }
                            <span className="history-table-findNumber"> # {text}</span>
                        </span>

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
            width:"20%",
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
                        return  <Tooltip title={"终止"} onClick={()=>terminateOperation(record)}>
                                    <MinusCircleOutlined style={{cursor:"pointer",fontSize:16}}/>
                                </Tooltip>
                    default:
                        return <>
                            <ListAction del={()=>del(record)}/>
                            <span style={{marginLeft:15}} onClick={()=>terminateOperation(record)}>
                                <PlayCircleOutlined style={{cursor:"pointer",fontSize:16}}/>
                            </span>
                        </>
                }
            }
        }
    ]

    const goBack = () => {
        setDetail(false)
    }

    return (
        <Row style={detail?{ height: "100%", overflow: "hidden" }:{height: "100%", overflow: "auto" }}>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} >
                <div className="history">
                    <div className="history-content mf">
                        <Breadcrumb firstItem={"历史"}/>
                        <HistoryScreen
                            {...props}
                            historyType={historyType}
                            params={params}
                            screen={screen}
                        />
                        <div className="history-table">
                            <Table
                                bordered={false}
                                loading={isLoading}
                                columns={columns}
                                dataSource={historyList}
                                rowKey={record=>record.instanceId}
                                pagination={false}
                                locale={{emptyText: <EmptyText title={"没有查询到历史记录"}/>}}
                            />
                            <Page
                                currentPage={page.currentPage}
                                changPage={changPage}
                                page={page}
                            />
                        </div>
                    </div>
                </div>
                <DiskModal
                    visible={diskVisible}
                    setVisible={setDiskVisible}
                />
                <PipelineDrawer
                    width={"75%"}
                    visible={detail}
                    onClose={goBack}
                    mask={false}
                    type={'history'}
                >
                    <HistoryDetail
                        back={goBack}
                        historyType={"drawer"}
                        historyItem={historyItem}
                        setHistoryItem={setHistoryItem}
                        historyStore={historyStore}
                    />
                </PipelineDrawer>
            </Col>
        </Row>
    )
}

export default observer(HistoryTable)
