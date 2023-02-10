import React from "react";
import {Profile} from "tiklab-eam-ui";
import {message,Tooltip,Table,Space,Spin} from "antd";
import {PlayCircleOutlined,ClockCircleOutlined,LoadingOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EmptyText from "../../common/emptyText/emptyText";
import ListName from "../../common/list/listname";
import pip_success from "../../../assets/images/svg/pip_success.svg";
import pip_error from "../../../assets/images/svg/pip_error.svg";
import pip_fog from "../../../assets/images/svg/pip_fog.svg";
import pip_halt from "../../../assets/images/svg/pip_halt.svg";
import "./pipelineTable.scss";

const PipelineTable = props =>{

    const {structureStore,pipelineStore}=props

    const {pipelineStartStructure,killInstance}=structureStore
    const {pipelineList,updateFollow,fresh,setFresh} = pipelineStore

    //收藏
    const collectAction = record => {
        updateFollow({id:record.id}).then(res=>{
            if(record.collect===0){
                collectMessage(res,"收藏")
            }else {
                collectMessage(res,"取消")
            }
            setFresh(!fresh)
        })
    }

    const collectMessage = (res,info) =>{
        if(res.code===0){
            message.info({content:`${info}成功`,duration:0.5,className:"message"})
        }else {
            message.info({content: res.msg,duration:0.5,className:"message"})
        }
    }

    //去概况页面
    const goPipelineTask= (text,record) => props.history.push(`/index/task/${record.id}/survey`)

    //去历史页面
    const goHistory = record => props.history.push(`/index/task/${record.id}/structure`)

    //运行或者停止
    const work = record =>{
        if(record.state === 2){
            killInstance(record.id).then(()=>{
                setFresh(!fresh)
            })
        }else {
            pipelineStartStructure(record.id).then(res=>{
                if(res.data){
                    setFresh(!fresh)
                }
            })
        }
    }

    const tooltip = (statu,text,executor) =>{
        return <div>
            <div>执行人：{executor}</div>
            <div>执行状态：{statu}</div>
            <div>执行时间：{text}</div>
        </div>
    }

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"40%",
            ellipsis:true,
            render:(text,record)=>{
                return  <ListName
                            text={text}
                            onClick={()=>goPipelineTask(text,record)}
                            colors={record.color}
                            isImg={"isImg"}
                        />
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"30%",
            ellipsis:true,
            render:(text,record) =>{
                switch (record.buildStatus) {
                    case 10:
                        return  <Tooltip title={tooltip("成功",text,record.execUser.name)}>
                            <Space>
                                <img src={pip_success} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 1:
                        return <Tooltip title={tooltip("失败",text,record.execUser.name)}>
                            <Space>
                                <img src={pip_error} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 0:
                        return <Tooltip title={tooltip("待构建","无","无")}>
                            <Space>
                                <img src={pip_fog} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 20:
                        return  <Tooltip title={tooltip("终止",text,record.execUser.name)}>
                            <Space>
                                <img src={pip_halt} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                }
            }
        },
        {
            title: "负责人",
            dataIndex: ["user","nickname"],
            key: "user",
            width:"20%",
            ellipsis: true,
            render:(text,record) => {
                return <Space>
                    <Profile userInfo={record.user}/>
                    {text}
                </Space>
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <>
                        <Space>
                            <Tooltip title="运行" >
                                <span className="pipelineTable-state" onClick={()=>work(record)}>
                                {
                                    record.state === 2 ?
                                        <Spin indicator={<LoadingOutlined className="actions-se" spin />} />
                                        :
                                        <PlayCircleOutlined className="actions-se"/>
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
                                    record.collect === 0 ?
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
                    rowKey={record=>record.id}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={'暂无流水线'}/>}}
                />
            </div>
}

export default inject("structureStore")(observer(PipelineTable))
