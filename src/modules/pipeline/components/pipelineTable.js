import React from "react";
import {message,Tooltip,Table} from "antd";
import {getUser} from "tiklab-core-ui";
import {CheckCircleOutlined, CloseCircleOutlined,ExclamationCircleOutlined,PlayCircleOutlined,
    MinusCircleOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Running from "./running";
import "./pipelineTable.scss";
import EmptyText from "../../../common/emptyText/emptyText";

const PipelineTable = props =>{

    const {structureStore,pipelineStore}=props

    const {pipelineStartStructure,killInstance}=structureStore
    const {pipelineList,updateFollow,fresh,setFresh} = pipelineStore

    const userId = getUser().userId

    //收藏
    const collectAction = record => {
        const params = {
            pipeline:{pipelineId:record.pipelineId},
            userId:userId
        }
        updateFollow(params).then(res=>{
            if(record.pipelineCollect===0){
                collectMessage(res,"收藏")
            }else {
                collectMessage(res,"取消")
            }
            setFresh(!fresh)
        })
    }

    const collectMessage = (res,info) =>{
        if(res.data === "1"){
            message.info({content:`${info}成功`,duration:0.5,className:"message"})
        }else {
            message.info({content:`${info}失败`,duration:0.5,className:"message"})
        }
    }

    //去详情页面
    const goPipelineTask= (text,record) =>{
        props.history.push(`/index/task/${record.pipelineId}/work`)
    }

    const work = record =>{
        const params = {
            userId:userId,
            pipelineId:record.pipelineId
        }
        if(record.pipelineState === 0){
            pipelineStartStructure(params).then(res=>{
                if(res.data === 1){
                    // setFresh(!fresh)
                    setTimeout(()=>setFresh(!fresh),1000)
                }
            })
        }else {
            killInstance(params).then(()=>{
                setFresh(!fresh)
            })
        }
    }

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "pipelineName",
            key: "pipelineName",
            width:"200px",
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <span className="pipelineTable-pipelineName">
                        <span onClick={()=>goPipelineTask(text,record)}
                              className="pipelineTable-pipelineName-task"
                        >
                            <span className={`pipelineTable-pipelineName-icon icon-${record.color}`}>
                                {text.substring(0,1).toUpperCase()}
                            </span>
                            <span className="pipelineTable-pipelineName-name">
                                {text}
                            </span>
                        </span>
                    </span>
                )
            }
        },
        {
            title: "最近构建状态",
            dataIndex: "buildStatus",
            key: "buildStatus",
            width:"200px",
            render:text =>{
                switch (text) {
                    case 30:
                        return  <Tooltip title="成功">
                                    <CheckCircleOutlined style = {{fontSize:26,color:"#1890ff"}}/>
                                </Tooltip>
                    case 1:
                        return <Tooltip title="失败">
                                    <CloseCircleOutlined style = {{fontSize:26,color:"#ff0000"}}/>
                                </Tooltip>
                    case 0:
                        return  <Tooltip title="待构建">
                                    <MinusCircleOutlined style = {{fontSize:26,color:"#6698ff"}}/>
                                </Tooltip>
                    case 20:
                        return  <Tooltip title="停止">
                                    <ExclamationCircleOutlined style = {{fontSize:26}}/>
                                </Tooltip>
                }
            }
        },
        {
            title: "最近构建时间",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"220px",
        },
        {
            title: "最近成功时间",
            dataIndex: "lastSuccessTime",
            key: "lastSuccessTime",
            width:"220px",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width:"220px",
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"200px",
            render:(text,record)=>{
                return(
                    <>
                        <Tooltip title="运行" >
                            <span className="pipelineTable-state" onClick={() =>work(record)}>
                            {
                                record.pipelineState === 0 ?
                                    <PlayCircleOutlined className="actions-se"/>
                                    :
                                    <span className="pipelineTable-state-running">
                                        <Running/>
                                    </span>
                            }
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <span className="pipelineTable-collect actives" onClick={()=>collectAction(record)}>
                            {
                                record.pipelineCollect === 0 ?
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-xingxing-kong"  />
                                    </svg>
                                    :
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-xingxing1"  />
                                    </svg>
                            }
                            </span>
                        </Tooltip>
                    </>
                )
            }
        },
    ]

    return  <div className="pipelineTable">
                <Table
                    bordered={false}
                    columns={columns}
                    dataSource={pipelineList}
                    rowKey={record=>record.pipelineId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
}

export default inject("structureStore")(observer(PipelineTable))