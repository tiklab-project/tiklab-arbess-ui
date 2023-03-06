import React,{useState} from "react";
import {Table} from "antd";
import { observer } from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Page from "../../../common/page/Page";
import {getTime} from "../../../common/client/Client";
import {SpinLoading} from "../../../common/loading/Loading";
import HistoryDetail from "./HistoryDetail";
import HistoryScreen from "./HistoryScreen";
import {runStatus,actionEn,runWay} from "./HistoryTrigger";
import "./HistoryTable.scss"

const HistoryTable = props =>{

    const {tableType,isLoading,setType,setUseId,setState,setPipelineId,pipelineUserList,pipelineList,
        detailsVisible,setDetailsVisible,historyStore
    } = props

    const {pageCurrent,setPageCurrent,page,historyList,deleteInstance,execStop} = historyStore

    // 单个历史信息
    const [historyItem,setHistoryItem] = useState({})

    /**
     * 切换列表详情页面
     * @param record
     */
    const details = record => {
        setHistoryItem(record)
        setDetailsVisible(true)
    }

    /**
     * 换页
     * @param pages：页码
     */
    const changPage = pages =>{
        setPageCurrent(pages)
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
            render:(text,record) => runStatus(record.runStatus),
        },
        {
            title: "触发信息",
            dataIndex: "runWay",
            key: "runWay",
            width:"20%",
            ellipsis:true,
            render:(text,record) => runWay(text,record)
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
            dataIndex: "runTime",
            key: "runTime",
            width:"17%",
            ellipsis:true,
            render:(text,record)=> getTime(text)
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=> actionEn(record,deleteInstance,execStop)
        }
    ]

    if(detailsVisible){
        return  <HistoryDetail
                    firstItem={"历史"}
                    tableType={tableType}
                    historyItem={historyItem}
                    detailsVisible={detailsVisible}
                    setDetailsVisible={setDetailsVisible}
                    historyStore={historyStore}
                />
    }

    return (
        <div className='history'>
            <div className="history-content mf-home-limited mf">
                <BreadcrumbContent firstItem={"历史"}/>
                <HistoryScreen
                    changPage={changPage}
                    pipelineList={pipelineList}
                    pipelineUserList={pipelineUserList}
                    setType={setType}
                    setState={setState}
                    setPipelineId={setPipelineId}
                    setUseId={setUseId}
                />
                <div className="history-table">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={historyList}
                        rowKey={record=>record.instanceId}
                        pagination={false}
                        locale={{emptyText:isLoading?
                                <SpinLoading type="table"/>:<EmptyText title={"没有查询到历史记录"}/>}}
                    />
                    <Page
                        pageCurrent={pageCurrent}
                        changPage={changPage}
                        page={page}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(HistoryTable)