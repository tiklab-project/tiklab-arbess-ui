import React,{useState} from "react";
import {message,Tooltip,Dropdown,Modal} from "antd";
import {getUser} from "tiklab-core-ui";
import {
    CheckCircleOutlined, CloseCircleOutlined,DeleteOutlined,EditOutlined,
    ExclamationCircleOutlined, EllipsisOutlined, PlayCircleOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Running from "./running";
import Tables from "../../../../common/tables/tables";
import "./matFlowTable.scss";
import MatFlowRenameModal from "./matFlowRenameModal";

const MatFlowTable = props =>{

    const {structureStore,type,matFlowStore}=props

    const {matFlowStartStructure,killInstance}=structureStore
    const {matFlowList,followList,updateFollow,updateMatFlow,fresh,setFresh,deleteMatFlow} = matFlowStore

    const [renameVisible,setRenameVisible] = useState(false)
    const [matFlowId,setMatFlowId] = useState("")

    const userId = getUser().userId

    //收藏
    const collectAction = record => {
        const params = {
            matFlow:{matflowId:record.matFlowId},
            userId:userId
        }
        updateFollow(params).then(res=>{
            if(record.matFlowCollect===0){
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
    const goMatFlowTask= text =>{
        props.history.push(`/index/task/${text}/work`)
    }

    const work = record =>{
        const params = {
            userId:userId,
            matFlowId:record.matFlowId
        }
        if(record.matFlowState === 0){
            matFlowStartStructure(params).then(res=>{
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
            setMatFlowId(record.matFlowId)
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
            matFlowId:record.matFlowId
        }
        deleteMatFlow(params).then(res=>{
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
            dataIndex: "matFlowName",
            key: "matFlowName",
            render:(text,record)=>{
                return(
                    <span onClick={()=>goMatFlowTask(text,record)}
                          style={{color:"#1890ff",cursor:"pointer"}}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "最近构建状态",
            dataIndex: "structureStatus",
            key: "structureStatus",
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
            dataIndex: "lastStructureTime",
            key: "lastStructureTime",
        },
        {
            title: "最近成功时间",
            dataIndex: "lastSuccessTime",
            key: "lastSuccessTime",
        },
        {
            title: "创建时间",
            dataIndex: "lastSuccessTime",
            key: "lastSuccessTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            render:(text,record)=>{
                return(
                    <>
                        <Tooltip title="运行" >
                            <span className="matflowTable-state" onClick={() =>work(record)}>
                            {
                                record.matFlowState === 0 ?
                                    <PlayCircleOutlined className="actions-se"/>
                                    :
                                    <Running/>
                            }
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <span className="matflowTable-collect actives" onClick={()=>collectAction(record)}>
                            {
                                record.matFlowCollect === 0 ?
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
                                <div className="matflowTable-actions-menu">
                                    <div className="actions-menu-content">
                                        <div className="matflowTable-actions" onClick={()=>renameOrDel(record,"rename")}>
                                            <EditOutlined/> &nbsp;重命名
                                        </div>
                                        <div className="matflowTable-actions-del" onClick={()=>renameOrDel(record,"del")}>
                                            <DeleteOutlined/> &nbsp;删除
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <span className="matflowTable-actions">
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
                    dataSource={type===1 ? matFlowList:followList}
                    rowKey={record=>record.matFlowId}
                />
                <MatFlowRenameModal
                    fresh={fresh}
                    setFresh={setFresh}
                    userId={userId}
                    matFlowId={matFlowId}
                    matFlowList={matFlowList}
                    renameVisible={renameVisible}
                    setRenameVisible={setRenameVisible}
                    updateMatFlow={updateMatFlow}
                />
            </>
}

export default inject("structureStore")(observer(MatFlowTable))