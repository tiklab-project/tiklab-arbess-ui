import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Table} from "antd";
import HistoryDetail from "./HistoryDetail";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import Page from "../../../common/page/Page";
import HistoryScreen from "./HistoryScreen";
import {getTime} from "../../../common/client/Client";
import {actionEn, runStatus, runWay} from "./HistoryTrigger";
import {SpinLoading} from "../../../common/loading/Loading";
import "./HistoryPipeline.scss";

/**
 * 查询单个流水线历史运行列表
 */
const HistoryPipeline = props => {

    const {historyStore,pipelineStore} = props

    const {findPipelineState,pipelineRunStatus,findPageHistory,deleteHistoryLog,
        findAllLog,killInstance,historyList,freshen,pageCurrent,setPageCurrent,
        execData,page,setHistoryList} = historyStore
    const {pipeline,findDmUserPage,pipelineUserList} = pipelineStore

    const [strPipeDetails,setStrPipeDetails] = useState(false)
    const [isLoading,setIsLoading] = useState(true) // 加载
    const [index,setIndex] = useState(0) //1:完成状态；2:运行中状态
    const [state,setState] = useState(0)  // 筛选条件--执行状态
    const [userId,setUseId] = useState(null)  // 筛选条件--执行人
    const [type,setType] = useState(0)  // 筛选条件--执行方式

    useEffect(()=>{
        // 项目成员
        pipeline && findDmUserPage(pipeline.id)
        return ()=>{
            setPageCurrent(1)
            setHistoryList()
        }
    },[pipeline])

    // 运行状态加载
    let interval=null
    useEffect(() => {
        pipeline && findPipelineState(pipeline.id).then(res=>{
            if(res.data===2){
                interval=setInterval(()=>
                    pipelineRunStatus(pipeline.id).then(res=>{
                        if(res.code===0){
                            res.data.allState === 0 && clearInterval(interval)
                        }
                    }), 1000)
            }
        })
        // 组件销毁事件
        return ()=>{
            setPageCurrent(1)
            clearInterval(interval)
        }
    }, [pipeline,freshen])

    // 所有历史列表
    useEffect(()=>{
        pipeline && findPageHistory({
            pipelineId:pipeline.id,
            state:state,
            userId:userId,
            type:type
        }).then(()=>{
            setIsLoading(false)
        })
    },[pipeline,freshen,pageCurrent,userId,state,type])

    // 构建详情
    const details = record =>{
        switch (record.runStatus) {
            case 30:
                setIndex(2)
                break
            default:
                findAllLog(record.historyId)
                setIndex(1)
        }
        setStrPipeDetails(true)
    }

    // 换页
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
                return  <span className="str-table-findNumber" onClick={()=>details(record)}>
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
            width:"15%",
            ellipsis:true,
            render:(text,record)=>{
                switch(record.runStatus){
                    case 30:
                        return execData.allTime?getTime(execData.allTime):"0 秒"
                    default:
                        return getTime(text)
                }
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=> actionEn(record,deleteHistoryLog,killInstance)
        }
    ]

    if(strPipeDetails){
        return <HistoryDetail
                    index={index}
                    pipeline={pipeline}
                    firstItem={"历史"}
                    isDetails={strPipeDetails}
                    setIsDetails={setStrPipeDetails}
                    historyStore={historyStore}
                />
    }

    return (
        <div className="strPipeline">
            <div className="strPipeline-content mf-home-limited mf">
                <BreadcrumbContent firstItem={"历史"}/>
                <HistoryScreen
                    changPage={changPage}
                    pipelineUserList={pipelineUserList}
                    setType={setType}
                    setState={setState}
                    setUseId={setUseId}
                />
                <div className="strPipeline-content-table">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={historyList}
                        rowKey={record=>record.historyId}
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

export default inject("historyStore","pipelineStore")(observer(HistoryPipeline))
