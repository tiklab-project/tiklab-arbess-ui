import React from "react";
import {Profile} from "tiklab-eam-ui";
import {message,Tooltip,Table,Space} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined,ExclamationCircleOutlined,PlayCircleOutlined,
    MinusCircleOutlined,ClockCircleOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Running from "./running";
import "./pipelineTable.scss";
import EmptyText from "../../../common/emptyText/emptyText";

const PipelineTable = props =>{

    const {structureStore,pipelineStore}=props

    const {pipelineStartStructure,killInstance}=structureStore
    const {pipelineList,updateFollow,fresh,setFresh} = pipelineStore

    //收藏
    const collectAction = record => {
        const params = {
            pipeline:{pipelineId:record.pipelineId},
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

    const goHistory = record =>{
        props.history.push(`/index/task/${record.pipelineId}/structure`)
    }

    const work = record =>{
        const params = {
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
                            <span className="pipelineTable-pipelineName-text">
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
                                    <CheckCircleOutlined style = {{fontSize:26,color:"#0063FF"}}/>
                                </Tooltip>
                    case 1:
                        return <Tooltip title="失败">
                                    <CloseCircleOutlined style = {{fontSize:26,color:"#ff0000"}}/>
                                </Tooltip>
                    case 0:
                        return  <Tooltip title="待构建">
                                    <MinusCircleOutlined style = {{fontSize:26,color:"#8795b1"}}/>
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
            title: "负责人",
            dataIndex: "userName",
            key: "userName",
            width:"220px",
            ellipsis: true,
            render:(text) => {
                return <Space>
                    <Profile />
                    {text}
                </Space>
            }
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
                        <Tooltip title="历史">
                            <span className="pipelineTable-history"
                                  onClick={()=>goHistory(record)}
                            >
                                <ClockCircleOutlined className="actions-se"/>
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <span className="pipelineTable-collect"
                                  onClick={()=>collectAction(record)}
                            >
                            {
                                record.pipelineCollect === 0 ?
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-xingxing-kong`} />
                                    </svg>
                                    :
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-xingxing1`} />
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