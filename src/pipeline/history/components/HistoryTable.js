import React, {useState} from "react";
import {Popconfirm, Table, Tooltip} from "antd";
import {observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
import Profile from "../../../common/profile/Profile";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import Page from "../../../common/page/Page";
import HistoryScreen from "./HistoryScreen";
import {runStatusIcon,runStatusText} from "./HistoryTrigger";
import {DeleteOutlined, MinusCircleOutlined} from "@ant-design/icons";
import pip_trigger from "../../../assets/images/svg/pip_trigger.svg";
import HistoryDetail from "./HistoryDetail";
import "./HistoryTable.scss"

const HistoryTable = props =>{

    const {tableType,isLoading,setIsLoading,setDetail,params,setParams,
        historyStore,pipelineUserList,pipelineList,
    } = props

    const {page,historyList,deleteInstance,execStop} = historyStore

    // 历史信息
    const [historyItem,setHistoryItem] = useState(null)

    /**
     * 切换列表详情页面
     * @param record
     */
    const details = record => {
        setDetail(false)
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
        deleteInstance(record.instanceId)
    }

    /**
     * 终止运行
     */
    const terminateOperation = record => {
        execStop(record.id)
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "findNumber",
            key: "findNumber",
            width:"20%",
            ellipsis:true,
            render:(text,record) =>{
                if(tableType==="history"){
                    return <span className="history-table-name" onClick={()=>details(record)}>
                                <span className="history-table-pipeline">{record.pipeline && record.pipeline.name}</span>
                                <span className="history-table-findNumber"> #{text}</span>
                            </span>
                }
                return  <span className="history-table-findNumber" onClick={()=>details(record)}>
                            {`# ${text}`}
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
                                <Profile userInfo={record.user}/>
                                <div className="runWay-user">{record.user.nickname}手动触发</div>
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
            width:"17%",
            ellipsis:true,
            // render:(text,record)=> getTime(text)
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
                        return  <Tooltip title={"终止"} onClick={()=>terminateOperation(record.pipeline)}>
                                    <MinusCircleOutlined style={{cursor:"pointer"}}/>
                                </Tooltip>
                    default:
                        return (
                            <Tooltip title={"删除"}>
                                <Popconfirm
                                    placement="topRight"
                                    title="你确定删除吗"
                                    onConfirm={()=>del(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <span style={{cursor:"pointer"}}>
                                        <DeleteOutlined />
                                    </span>
                                </Popconfirm>
                            </Tooltip>
                        )
                }
            }
        }
    ]

    const goBack = () => {
        setDetail(true)
        setHistoryItem(false)
    }

    if(historyItem){
        return  <HistoryDetail
                    back={goBack}
                    tableType={tableType}
                    historyItem={historyItem}
                    historyStore={historyStore}
                />
    }

    return (
        <div className='history'>
            <div className="history-content mf-home-limited mf">
                <Breadcrumb firstItem={"历史"}/>
                <HistoryScreen
                    pipelineList={pipelineList}
                    pipelineUserList={pipelineUserList}
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
    )
}

export default observer(HistoryTable)
