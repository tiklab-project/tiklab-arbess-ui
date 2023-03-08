import React from "react";
import {message,Tooltip,Table,Space,Spin} from "antd";
import {PlayCircleOutlined,ClockCircleOutlined,LoadingOutlined,LockOutlined,UnlockOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
import ListIcon from "../../../common/list/ListIcon";
import pip_success from "../../../assets/images/svg/pip_success.svg";
import pip_error from "../../../assets/images/svg/pip_error.svg";
import pip_fog from "../../../assets/images/svg/pip_fog.svg";
import pip_halt from "../../../assets/images/svg/pip_halt.svg";
import "./PipelineTable.scss";

/**
 * 流水线表格页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineTable = props =>{

    const {historyStore,pipelineStore}=props

    const {execStart,execStop}=historyStore
    const {pipelineList,updateFollow,fresh,setFresh} = pipelineStore

    /**
     * 收藏
     * @param record
     */
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

    /**
     * 收藏提示
     * @param res：收藏返回的状态
     * @param info：收藏||取消收藏
     */
    const collectMessage = (res,info) =>{
        if(res.code===0){
            message.info(`${info}成功`,0.5)
        }else {
            message.info(res.msg,0.5)
        }
    }

    /**
     * 去概况页面
     * @param text：流水线名称
     * @param record
     * @returns {*}
     */
    const goPipelineTask= (text,record) => props.history.push(`/index/pipeline/${record.id}/survey`)

    /**
     * 去历史页面
     * @param record
     * @returns {*}
     */
    const goHistory = record => props.history.push(`/index/pipeline/${record.id}/structure`)

    /**
     * 运行或者终止
     * @param record
     */
    const work = record =>{
        if(record.state === 2){
            // 终止
            execStop(record.id).then(()=>{
                setFresh(!fresh)
            })
        }else {
            // 运行
            execStart(record.id).then(()=>{
                setFresh(!fresh)
            })
        }
    }

    // 构建信息提示
    const buildStatusTooltip = (statu,text,executor) => (
        <div>
            <div>执行人：{executor}</div>
            <div>执行状态：{statu}</div>
            <div>执行时间：{text}</div>
        </div>
    )

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"35%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span  className='pipelineTable-name' onClick={()=>goPipelineTask(text,record)}>
                            <ListIcon text={text} colors={record.color}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                switch (record.buildStatus) {
                    case "success":
                        return  <Tooltip title={buildStatusTooltip("成功",text,record.execUser.name)}>
                                    <Space>
                                        <img src={pip_success} alt={"log"} className="imgs"/>
                                        {text}
                                    </Space>
                                </Tooltip>
                    case "error":
                        return  <Tooltip title={buildStatusTooltip("失败",text,record.execUser.name)}>
                                    <Space>
                                        <img src={pip_error} alt={"log"} className="imgs"/>
                                        {text}
                                    </Space>
                                </Tooltip>
                    case "run":
                        return <Tooltip title={buildStatusTooltip("运行中",text,record.execUser.name)}>
                                    <Space>
                                        <img src={pip_fog} alt={"log"} className="imgs"/>
                                        {text}
                                    </Space>
                                </Tooltip>
                    case "wait":
                        return  <Tooltip title={buildStatusTooltip("待构建","待构建","无")}>
                                    <Space>
                                        <img src={pip_fog} alt={"log"} className="imgs"/>
                                        待构建
                                    </Space>
                                </Tooltip>
                    case "halt":
                        return   <Tooltip title={buildStatusTooltip("终止",text,record.execUser.name)}>
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
            width:"15%",
            ellipsis: true,
            render:(text,record) => {
                return  <Space>
                            {/*<Profile userInfo={record.user}/>*/}
                            {text}
                        </Space>
            }
        },
        {
            title: "可见范围",
            dataIndex: "power",
            key: "power",
            width:"15%",
            ellipsis: true,
            render:(text,record) => {
                switch (text) {
                    case 1:
                        return  <Space>
                                    <UnlockOutlined />
                                    全局
                                </Space>
                    case 2:
                        return  <Space>
                                    <LockOutlined />
                                    私有
                                </Space>
                }
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
                            <span className="pipelineTable-history" onClick={()=>goHistory(record)}>
                                <ClockCircleOutlined className="actions-se"/>
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <span className="pipelineTable-collect" onClick={()=>collectAction(record)}>
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

export default inject("historyStore")(observer(PipelineTable))
