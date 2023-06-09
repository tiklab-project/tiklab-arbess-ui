import React from "react";
import {message,Tooltip,Table,Space,Spin} from "antd";
import {
    PlayCircleOutlined,
    ClockCircleOutlined,
    LoadingOutlined,
    LockOutlined,
    UnlockOutlined,
    MinusCircleOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
import Profile from "../../../common/profile/Profile";
import ListIcon from "../../../common/list/ListIcon";
import Page from "../../../common/page/Page";
import pip_success from "../../../assets/images/svg/pip_success.svg";
import pip_error from "../../../assets/images/svg/pip_error.svg";
import pip_fog from "../../../assets/images/svg/pip_fog.svg";
import pip_halt from "../../../assets/images/svg/pip_halt.svg";
import "./PipelineTable.scss";
import {SpinLoading} from "../../../common/loading/Loading";

/**
 * 流水线表格页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineTable = props =>{

    const {historyStore,pipelineStore,changPage,changFresh,listType,isLoading}=props

    const {execStart,execStop}=historyStore
    const {pipelineListPage,updateFollow,pipPage} = pipelineStore

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
            changFresh()
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
     * 去历史构建详情
     * @param record
     * @returns {*}
     */
    const goInstance = record => props.history.push(`/index/pipeline/${record.id}/structure/${record.instanceId}/post`)

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
        if(record.state === 1){
            // 运行
            execStart(record.id).then(()=>{
                changFresh()
            })
        } else {
            // 运行
            execStop(record.id).then(()=>{
                changFresh()
            })
        }
    }

    const renTip = buildStatus => {
        switch (buildStatus) {
            case "success": return  "成功"
            case "error": return "失败"
            case "run": return  "正在运行"
            case "wait": return  "等待"
            case "halt": return  "终止"
            default: return '无构建'
        }
    }

    const renImg = buildStatus => {
        switch (buildStatus) {
            case "success": return pip_success
            case "error": return pip_error
            case "run": return pip_fog
            case "wait": return pip_fog
            case "halt": return pip_halt
            default: return pip_success
        }
    }

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"30%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span className='pipelineTable-name' onClick={()=>goPipelineTask(text,record)}>
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
                const {buildStatus,number} = record
                return (
                    <Space>
                        <Tooltip title={renTip(buildStatus)}>
                            <img src={renImg(buildStatus)} alt={"log"} className="imgs"/>
                        </Tooltip>
                        { text || '无构建' }
                        { number && <span className='pipeline-number' onClick={() => goInstance(record)}># {number}</span>}
                    </Space>
                )
            }
        },
        {
            title: "负责人",
            dataIndex: ["user","nickname"],
            key: "user",
            width:"20%",
            ellipsis: true,
            render:(text,record) => {
                return  <Space>
                            <Profile userInfo={record.user}/>
                            { text }
                        </Space>
            }
        },
        {
            title: "可见范围",
            dataIndex: "power",
            key: "power",
            width:"15%",
            ellipsis: true,
            render:text => {
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
                const {state,collect} = record
                return(
                    <Space>
                        <Tooltip title={state===3?"等待":"运行"} >
                            <span className="pipelineTable-state" onClick={()=>work(record)}>
                                { state === 1 && <PlayCircleOutlined className="actions-se"/> }
                                { state === 2 && <Spin indicator={<LoadingOutlined className="actions-se" spin />} /> }
                                { state === 3 && <MinusCircleOutlined className="actions-se"/> }
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
                                collect === 0 ?
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
                    dataSource={pipelineListPage}
                    rowKey={record=>record.id}
                    pagination={false}
                    locale={{emptyText: isLoading ?
                            <SpinLoading type="table"/>: <EmptyText title={listType===1?"暂无流水线":"暂无收藏"}/>}}
                />
                {
                    pipPage?.total > 1 &&
                    <Page pageCurrent={pipPage.current} changPage={changPage} page={pipPage}/>
                }
            </div>
}

export default inject("historyStore")(observer(PipelineTable))
