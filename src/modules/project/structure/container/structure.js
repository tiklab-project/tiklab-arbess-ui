import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Profile} from "tiklab-eam-ui";
import { withRouter } from "react-router";
import {Popconfirm,Spin,Table,Tooltip} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlayCircleOutlined,
    DeleteOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import StrDetail from "../components/strDetail";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../common/emptyText/emptyText";
import Page from "../../../common/page/page";
import StrScreen from "../components/strScreen";
import {getTime} from "../../../common/client/client";
import "../components/structure.scss";

const Structure = props => {

    const {structureStore,pipelineStore} = props

    const {findPipelineState,pipelineRunStatus,findPageHistory,deleteHistoryLog,
        findAllLog,findPipelineUser,killInstance,
        leftPageList,pageCurrent,setPageCurrent,freshen,
        execData,page,pipelineUserList
    } = structureStore
    const {pipelineId,pipeline} = pipelineStore
    
    const [index,setIndex] = useState(0)
    const [detailsContent,setDetailsContent] = useState("")
    const [state,setState] = useState(0)
    const [type,setType] = useState(0)
    const [enforcer,setEnforcer] = useState(null)
    const [isDetails,setIsDetails] = useState(false)

    useEffect(()=>{
        if(pipelineId){
            findPipelineUser(pipelineId)
            setIsDetails(false)
        }
    },[pipelineId])

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

    useEffect(()=>{
        const params = {
            pipelineId:pipelineId,
            state:state,
            userId:enforcer,
            type:type
        }
        pipelineId && findPageHistory(params) // 历史列表
    },[pipelineId,freshen,pageCurrent,state,enforcer,type,])

    const details = record =>{
        switch (record.runStatus) {
            case 0:
                setIndex(1)
                break
            default:
                setIndex(2)
                findAllLog(record.historyId)
        }
        setDetailsContent(record)
        setIsDetails(true)
    }

    const end = () => {
        killInstance(pipelineId)
    }
    
    const del = record =>{
        deleteHistoryLog(record.historyId)
    }

    const changPage = pages =>{
        setPageCurrent(pages)
    }

    const  columns = [
        {
            title: "名称",
            dataIndex: "findNumber",
            key: "findNumber",
            width:"15%",
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
            width:"15%",
            ellipsis:true,
            render:(text,record) => {
                switch(text){
                    case 1 :
                        //失败
                        return  <Tooltip title={"运行失败"}>
                                    <CloseCircleOutlined style = {{fontSize:16,color:"red"}}/>
                                </Tooltip>
                    case 10 :
                        //成功
                        return  <Tooltip title={"运行成功"}>
                                    <CheckCircleOutlined style = {{fontSize:16,color:"#0063FF"}}/>
                                </Tooltip>
                    case 20:
                        //被迫停止
                        return  <Tooltip title={"运行终止"}>
                                    <ExclamationCircleOutlined style = {{fontSize:16}}/>
                                </Tooltip>
                    case 0:
                        //运行
                        return  <Tooltip title={"正在运行"}>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
                                </Tooltip>
                    case 3:
                        //运行--等待运行
                        return <Tooltip title={"等待运行"}>
                                    <PlayCircleOutlined style = {{fontSize:16}}/>
                                </Tooltip>
                }
            }
        },
        {
            title: "触发信息",
            dataIndex: "runWay",
            key: "runWay",
            width:"20%",
            ellipsis:true,
            render:(text,record) => {
                return  <div className="str-table-runWay">
                    {
                        text===1?
                            <>
                                <Profile userInfo={record.user}/>
                                <div className="runWay-user">{record.user.nickname}手动触发</div>
                            </>
                            :
                            <div className="runWay-user">定时任务自动触发</div>
                    }
                </div>
            }
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
            render:(text,record)=> {
                switch (record.runStatus) {
                    case 0:
                        return  <Tooltip title={"终止"} onClick={()=>end()}>
                                    <MinusCircleOutlined />
                                </Tooltip>
                    default:
                        return(
                            <Tooltip title={"删除"}>
                                <Popconfirm
                                    placement="topRight"
                                    title="你确定删除吗"
                                    onConfirm={()=>del(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                <span className="str-table-del">
                                    <DeleteOutlined />
                                </span>
                                </Popconfirm>
                            </Tooltip>
                        )
                }
            },
        }
    ]

    if(isDetails){
        return <StrDetail
                    index={index}
                    pipeline={pipeline}
                    firstItem={"历史"}
                    setIsDetails={setIsDetails}
                    detailsContent={detailsContent}
                    structureStore={structureStore}
                />
    }

    return (
        <div className="structure mf">
            <div className="structure-content mf-home-limited">
                <BreadcrumbContent firstItem={pipeline.name} secondItem={"历史"}/>
                <StrScreen
                    pipelineUserList={pipelineUserList}
                    setState={setState}
                    setEnforcer={setEnforcer}
                    setType={setType}
                    changPage={changPage}
                />
                <div className="structure-content-table">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={leftPageList}
                        rowKey={record=>record.historyId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"没有查询到历史记录"}/>}}
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

export default withRouter(inject("structureStore","pipelineStore")(observer(Structure)))
