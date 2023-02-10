import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Profile} from "tiklab-eam-ui";
import {Table} from "antd";
import StrDetail from "./strDetail";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import EmptyText from "../../common/emptyText/emptyText";
import Loading from "../../common/loading/loading"
import Page from "../../common/page/page";
import StrScreen from "./strScreen";
import {getTime} from "../../common/client/client";
import {actionEn, runStatus, runWay} from "./strTrigger";
import "./strPipeline.scss";

const StrPipeline = props => {

    const {structureStore,pipelineStore} = props

    const {findPipelineState,pipelineRunStatus,findPageHistory,deleteHistoryLog,
        findAllLog,killInstance,historyList,freshen,pageCurrent,setPageCurrent,
        execData,page,
    } = structureStore
    const {pipelineId,pipeline,findDmUserPage,pipelineUserList} = pipelineStore

    const [index,setIndex] = useState(0) //1:运行；2:日志
    const [strPipeDetails,setStrPipeDetails] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 项目成员
        if(pipelineId){
            findDmUserPage(pipelineId)
        }
        // 组件销毁
        return()=>{
            setPageCurrent(1)
        }
    },[pipelineId])

    // 运行状态加载
    let interval=null
    useEffect(() => {
        pipelineId && findPipelineState(pipelineId).then(res=>{
            if(res.data===2){
                interval=setInterval(()=>
                    pipelineRunStatus(pipelineId).then(res=>{
                        if(res.code===0){
                            res.data.allState === 0 && clearInterval(interval)
                        }
                    }), 1000)
            }
        })
        return ()=>{
            setPageCurrent(1)
            clearInterval(interval)
        }
    }, [pipelineId,freshen])

    // 所有历史列表
    useEffect(()=>{
        const params = {
            pipelineId:pipelineId,
            state:0,
            userId:null,
            type:0
        }
        pipelineId && findPageHistory(params).then(res=>{
            setIsLoading(false)
        })
    },[pipelineId,freshen,pageCurrent])

    // 构建详情
    const details = record =>{
        switch (record.runStatus) {
            case 0:
                setIndex(1)
                break
            default:
                findAllLog(record.historyId)
                setIndex(2)
        }
        setStrPipeDetails(true)
    }

    // 换页
    const changPage = pages =>{
        setPageCurrent(pages)
    }

    const  columns = [
        {
            title: "名称",
            dataIndex: "findNumber",
            key: "findNumber",
            width:"20%",
            ellipsis:true,
            render:(text,record) =>{
                return  <span className="str-table-findNumber"
                             onClick={()=>details(record)}
                        >
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
            render:(text,record) => runStatus (record.runStatus),
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
                    case 0:
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
            render:(text,record)=> actionEn(record,deleteHistoryLog,killInstance,pipeline)
        }
    ]

    if(isLoading){
        return <Loading/>
    }

    if(strPipeDetails){
        return <StrDetail
                    index={index}
                    pipeline={pipeline}
                    firstItem={"历史"}
                    setIsDetails={setStrPipeDetails}
                    structureStore={structureStore}
                />
    }

    return (
        <div className="strPipeline">
            <div className="strPipeline-content mf-home-limited mf">
                <BreadcrumbContent firstItem={pipeline.name} secondItem={"历史"}/>
                <StrScreen
                    changPage={changPage}
                    id={pipelineId}
                    pipelineUserList={pipelineUserList}
                    findPageHistory={findPageHistory}
                />
                <div className="strPipeline-content-table">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={historyList}
                        rowKey={record=>record.historyId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无历史记录"}/>}}
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

export default inject("structureStore","pipelineStore")(observer(StrPipeline))
