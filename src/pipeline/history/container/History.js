import React,{useEffect,useState} from "react"
import {inject,observer} from "mobx-react";
import {Table} from "antd";
import {SpinLoading} from "../../../common/loading/Loading";
import {getTime} from "../../../common/client/Client";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import Page from "../../../common/page/Page";
import HistoryDetail from "../components/HistoryDetail";
import HistoryScreen from "../components/HistoryScreen";
import {runStatus,actionEn,runWay} from "../components/HistoryTrigger";
import "../components/History.scss";

/**
 * 所有历史页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const History = props => {

    const {historyStore,pipelineStore} = props

    const {findUserRunPageHistory,historyList,findAllLog,deleteHistoryLog,killInstance,freshen,
        pageCurrent,setPageCurrent,page,setHistoryList} = historyStore
    const {findAllPipelineStatus,pipelineList} = pipelineStore

    const [detailsVisible,setDetailsVisible] = useState(false) // 列表数据详情
    const [pipeline,setPipeline] = useState(0) // 获取流水线信息
    const [index,setIndex] = useState(0) //1:完成状态；2:运行中状态
    const [pipelineId,setPipelineId] = useState(null)  // 筛选条件--流水线
    const [state,setState] = useState(0)  // 筛选条件--执行状态
    const [type,setType] = useState(0)  // 筛选条件--执行方式
    const [isLoading,setIsLoading] = useState(true) // 加载

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus()
        return ()=>{
            setPageCurrent(1)
            setHistoryList()
        }
    },[])

    let inter = null
    useEffect(()=>{
        // 所有构建历史列表
        inter = setInterval(()=>findUserRunPageHistory({
            pipelineId:pipelineId,
            state:state,
            type:type
        }).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                if(!res.data){
                    clearInterval(inter)
                }else {
                    if(res.data.dataList && res.data.dataList[0].runStatus!==30){
                        clearInterval(inter)
                    }
                }
            }
        }),1000)
        if(detailsVisible){
            clearInterval(inter)
        }
        return ()=>clearInterval(inter)
    },[freshen,pageCurrent,pipelineId,state,type,detailsVisible])

    /**
     * 列表数据详情
     * @param record
     */
    const details = record => {
        switch (record.runStatus) {
            case 30:
                setIndex(2)
                break
            default:
                findAllLog(record.historyId)
                setIndex(1)
        }
        setPipeline(record.pipeline)
        setDetailsVisible(true)
    }

    /**
     * 换也
     * @param pages
     */
    const changPage = pages =>{
        setPageCurrent(pages)
    }

    const columns = [
        {
            title: "名称",
            dataIndex: ["pipeline","name"],
            key: ["pipeline","name"],
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                return  <span className="str-table-name" onClick={()=>details(record)}>
                            {`${text}`}
                            <span className="str-table-findNumber"> #{record.findNumber}</span>
                        </span>
            }
        },
        {
            title: "状态",
            dataIndex: "runStatus",
            key: "runStatus",
            width:"10%",
            ellipsis:true,
            render:(text,record) => runStatus (record.runStatus),
        },
        {
            title: "触发信息",
            dataIndex: "runWay",
            key: "runWay",
            width:"21%",
            ellipsis:true,
            render:(text,record) => runWay(text,record)
        },
        {
            title: "开始",
            dataIndex: "createTime",
            key: "createTime",
            width:"17%",
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
            render:(text,record)=> actionEn(record,deleteHistoryLog,killInstance,pipeline)
        }
    ]

    if(detailsVisible){
        return <HistoryDetail
                    index={index}
                    pipeline={pipeline}
                    firstItem={"历史"}
                    isAll={"structure"}
                    isDetails={detailsVisible}
                    setIsDetails={setDetailsVisible}
                    historyStore={historyStore}
                />
    }

    return (
        <div className='structure'>
            <div className="structure-content mf-home-limited mf">
                <BreadcrumbContent firstItem={"历史"}/>
                <HistoryScreen
                    changPage={changPage}
                    pipelineList={pipelineList}
                    setType={setType}
                    setState={setState}
                    setPipelineId={setPipelineId}
                />
                <div className='structure-content-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={historyList}
                        rowKey={record=>record.historyId}
                        pagination={false}
                        locale={{emptyText:isLoading?
                                <SpinLoading type="table"/>: <EmptyText title={"没有查询到历史记录"}/>}}
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

export default inject("historyStore","pipelineStore")(observer(History))
