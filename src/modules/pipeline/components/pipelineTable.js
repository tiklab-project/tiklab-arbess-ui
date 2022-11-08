import React from "react";
import {Profile} from "tiklab-eam-ui";
import {message,Tooltip,Table,Space,Spin} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined,
    MinusCircleOutlined,
    ClockCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import "./pipelineTable.scss";
import EmptyText from "../../../common/emptyText/emptyText";
import ListName from "../../../common/list/listname";

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

    const tooltip = (statu,text) =>{
        return <div>
            <div>
                构建状态：{statu}
            </div>
            <div>
                构建时间：{text}
            </div>
        </div>
    }


    const columns = [
        {
            title: "流水线名称",
            dataIndex: "pipelineName",
            key: "pipelineName",
            width:"200px",
            ellipsis:true,
            render:(text,record)=>{
                return  <ListName
                            text={text}
                            onClick={()=>goPipelineTask(text,record)}
                            colors={record.color}
                        />
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"200px",
            render:(text,record) =>{
                switch (record.buildStatus) {
                    case 30:
                        return  <Tooltip title={tooltip("成功",text)}>
                            <Space>
                                <CheckCircleOutlined style = {{fontSize:20,color:"#0063FF"}}/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 1:
                        return <Tooltip title={tooltip("失败",text)}>
                            <Space>
                                <CloseCircleOutlined style = {{fontSize:20,color:"#ff0000"}}/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 0:
                        return <Tooltip title={tooltip("待构建","无")}>
                            <Space>
                                <MinusCircleOutlined style = {{fontSize:20,color:"#8795b1"}}/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 20:
                        return  <Tooltip title={tooltip("停止",text)}>
                            <Space>
                                <ExclamationCircleOutlined style = {{fontSize:20}}/>
                                {text}
                            </Space>
                        </Tooltip>
                }
            }
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
                        <Space>
                            <Tooltip title="运行" >
                                <span className="pipelineTable-state" onClick={() =>work(record)}>
                                {
                                    record.pipelineState === 0 ?
                                        <PlayCircleOutlined className="actions-se"/>
                                        :
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                                }
                                </span>
                            </Tooltip>
                            <Tooltip title="历史">
                                <span className="pipelineTable-history"
                                      onClick={()=>goHistory(record)}
                                >
                                    <ClockCircleOutlined
                                        className="actions-se"
                                    />
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
                        </Space>
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