import React,{useEffect,useState} from "react"
import {inject,observer} from "mobx-react";
import {Table} from "antd";
import {getTime} from "../../common/client/client";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import EmptyText from "../../common/emptyText/emptyText";
import Page from "../../common/page/page";
import StrDetail from "../components/strDetail";
import StrScreen from "../components/strScreen";
import {runStatus, actionEn, runWay} from "../components/strTrigger";
import "../components/structure.scss";


const Structure = props => {

    const {structureStore,pipelineStore} = props

    const {findUserAllHistory,historyList,findAllLog,deleteHistoryLog,killInstance,freshen,
        pageCurrent,setPageCurrent
    } = structureStore

    const {findAllPipelineStatus,pipelineList} = pipelineStore

    const [detailsVisible,setDetailsVisible] = useState(false) // 列表数据详情
    const [index,setIndex] = useState(0) //1:运行；2:日志
    const [pipeline,setPipeline] = useState(0) // 获取流水线信息

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus()
        return ()=>setPageCurrent(1)
    },[])

    useEffect(()=>{
        // 所有构建历史列表
        findUserAllHistory()
    },[freshen,pageCurrent])


    // 列表数据详情
    const details = record => {
        switch (record.runStatus) {
            case 0:
                setIndex(1)
                break
            default:
                findAllLog(record.historyId)
                setIndex(2)
        }
        setPipeline(record.pipeline)
        setDetailsVisible(true)
    }

    const changPage = pages =>{
        setPageCurrent(pages)
    }

    const  columns = [
        {
            title: "名称",
            dataIndex: ["pipeline","name"],
            key: ["pipeline","name"],
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                return   <span className="str-table-name"
                               onClick={()=>details(record)}
                         >
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
            width:"20%",
            ellipsis:true,
            render:(text,record) => runWay(text,record)
        },
        {
            title: "开始",
            dataIndex: "createTime",
            key: "createTime",
            width:"15%",
            ellipsis:true,
        },
        {
            title: "耗时",
            dataIndex: "runTime",
            key: "runTime",
            width:"15%",
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
        return <StrDetail
                    index={index}
                    pipeline={pipeline}
                    firstItem={"历史"}
                    setIsDetails={setDetailsVisible}
                    structureStore={structureStore}
                    isAll={"isAll"}
                />
    }

    return (
        <div className='structure'>
            <div className="structure-content mf-home-limited mf">
                <BreadcrumbContent firstItem={"历史"}/>
                <StrScreen
                    changPage={changPage}
                    pipelineList={pipelineList}
                    findUserAllHistory={findUserAllHistory}
                />
                <div className='structure-content-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={historyList}
                        rowKey={record=>record.historyId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无历史记录"}/>}}
                    />
                    <Page
                        pageCurrent={1}
                        changPage={changPage}
                        page={1}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("structureStore","pipelineStore")(observer(Structure))
