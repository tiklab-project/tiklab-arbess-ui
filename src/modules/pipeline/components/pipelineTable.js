import React,{useState} from "react";
import {message,Tooltip,Dropdown,Modal} from "antd";
import {getUser} from "tiklab-core-ui";
import {
    CheckCircleOutlined, CloseCircleOutlined,DeleteOutlined,EditOutlined,
    ExclamationCircleOutlined, EllipsisOutlined, PlayCircleOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Running from "./running";
import Tables from "../../../common/tables/tables";
import "./pipelineTable.scss";
import PipelineRenameModal from "./pipelineRenameModal";

const PipelineTable = props =>{

    const {structureStore,type,pipelineStore}=props

    const {pipelineStartStructure,killInstance}=structureStore
    const {pipelineList,followList,updateFollow,updatePipeline,fresh,setFresh,deletePipeline} = pipelineStore

    const [renameVisible,setRenameVisible] = useState(false)
    const [pipelineId,setPipelineId] = useState("")

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
    const goPipelineTask= text =>{
        props.history.push(`/index/task/${text}/work`)
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

    const renameOrDel = (record,type) =>{
        if(type === "rename"){
            setRenameVisible(true)
            setPipelineId(record.pipelineId)
        }else {
            Modal.confirm({
                title: "删除",
                icon: <ExclamationCircleOutlined />,
                content: "删除后数据无法恢复",
                onOk:()=>del(record),
                okText: "确认",
                cancelText: "取消",
            });
        }
    }
    
    const del = record => {
        const params = {
            userId:userId,
            pipelineId:record.pipelineId
        }
        deletePipeline(params).then(res=>{
            if(res.code === 0 && res.data === 1){
                message.info({content: "删除成功", className: "message"})
            }else {
                message.error({content:"删除失败", className:"message"})
            }
            setFresh(!fresh)
        }).catch(error=>{
            console.log(error)
        })
    }

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "pipelineName",
            key: "pipelineName",
            render:(text,record)=>{
                return(
                    <span onClick={()=>goPipelineTask(text,record)}
                          style={{color:"#1890ff",cursor:"pointer"}}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "最近构建状态",
            dataIndex: "buildStatus",
            key: "buildStatus",
            render:text =>{
                switch (text) {
                    case 30:
                        return  <Tooltip title="成功" placement="rightTop" className="all-icon">
                                    <CheckCircleOutlined style = {{fontSize:25,color:"#1890ff"}}/>
                                </Tooltip>
                    case 1:
                        return <Tooltip title="失败" placement="rightTop" className="all-icon">
                                    <CloseCircleOutlined style = {{fontSize:25,color:"#ff0000"}}/>
                                </Tooltip>
                    case 0:
                        return  <Tooltip title="待构建" placement="rightTop" className="all-icon">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-dengdai1"/>
                                    </svg>
                                </Tooltip>
                    case 20:
                        return  <Tooltip title="停止" placement="rightTop" className="all-icon">
                                    <ExclamationCircleOutlined style = {{fontSize:25}}/>
                                </Tooltip>
                }
            }
        },
        {
            title: "最近构建时间",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
        },
        {
            title: "最近成功时间",
            dataIndex: "lastSuccessTime",
            key: "lastSuccessTime",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
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
                        <Dropdown trigger={["click"]}
                            overlay={
                                <div className="pipelineTable-actions-menu">
                                    <div className="actions-menu-content">
                                        <div className="pipelineTable-actions" onClick={()=>renameOrDel(record,"rename")}>
                                            <EditOutlined/> &nbsp;重命名
                                        </div>
                                        <div className="pipelineTable-actions-del" onClick={()=>renameOrDel(record,"del")}>
                                            <DeleteOutlined/> &nbsp;删除
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <span className="pipelineTable-actions">
                                <EllipsisOutlined className="actions-se"/>
                            </span>
                        </Dropdown>
                    </>
                )
            }
        },
    ]

    return  <>
                <Tables
                    columns={columns}
                    dataSource={type===1 ? pipelineList:followList}
                    rowKey={record=>record.pipelineId}
                />
                <PipelineRenameModal
                    fresh={fresh}
                    setFresh={setFresh}
                    userId={userId}
                    pipelineId={pipelineId}
                    pipelineList={pipelineList}
                    renameVisible={renameVisible}
                    setRenameVisible={setRenameVisible}
                    updatePipeline={updatePipeline}
                />
            </>
}

export default inject("structureStore")(observer(PipelineTable))