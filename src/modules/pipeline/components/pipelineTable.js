import React from "react";
import {Profile} from "tiklab-eam-ui";
import {message,Tooltip,Table,Space,Spin} from "antd";
import {
    CheckCircleOutlined,
    PlayCircleOutlined,
    ClockCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import "./pipelineTable.scss";
import EmptyText from "../../common/emptyText/emptyText";
import ListName from "../../common/list/listname";
import sun from "../../../assets/images/svg/sun.svg";
import rain from "../../../assets/images/svg/rain.svg";
import cloudy from "../../../assets/images/svg/cloudy.svg";

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
    const goPipelineTask= (text,record) => props.history.push(`/index/task/${record.pipelineId}/survey`)

    const goHistory = record => props.history.push(`/index/task/${record.pipelineId}/structure`)

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
                    case 10:
                        return  <Tooltip title={tooltip("成功",text,record.execUser.name)}>
                            <Space>
                                <img src={sun} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 1:
                        return <Tooltip title={tooltip("失败",text,record.execUser.name)}>
                            <Space>
                                <img src={rain} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 0:
                        return <Tooltip title={tooltip("待构建","无","无")}>
                            <Space>
                                <img src={sun} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                    case 20:
                        return  <Tooltip title={tooltip("停止",text,record.execUser.name)}>
                            <Space>
                                <img src={cloudy} alt={"log"} className="imgs"/>
                                {text}
                            </Space>
                        </Tooltip>
                }
            }
        },
        {
            title: "负责人",
            dataIndex: ["user","name"],
            key: "user",
            width:"220px",
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
            width:"200px",
            render:(text,record)=>{
                return(
                    <>
                        <Space>
                            <Tooltip title="运行" >
                                <span className="pipelineTable-state" onClick={() =>work(record)}>
                                {
                                    record.pipelineState === 2 ?
                                        <PlayCircleOutlined className="actions-se"/>
                                        :
                                        <Spin indicator={<LoadingOutlined className="actions-se" spin />} />
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