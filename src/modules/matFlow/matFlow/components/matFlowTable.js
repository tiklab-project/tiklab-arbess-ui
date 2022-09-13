import React,{useEffect} from "react";
import {message,Tooltip} from "antd";
import {getUser} from "tiklab-core-ui";
import {CheckCircleOutlined,CloseCircleOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Running from "./running";
import Tables from "../../../../common/tables/tables";

const MatFlowTable = props =>{

    const {structureStore,type,matFlowStore}=props

    const {matFlowStartStructure,killInstance}=structureStore
    const {findAllMatFlowStatus,findAllFollow,matFlowList,updateFollow,fresh,setFresh} = matFlowStore

    const userId = getUser().userId

    useEffect(()=>{
        if(type===1){
            findAllMatFlowStatus(userId)
        }else{
            findAllFollow(userId)
        }
    },[fresh,type])

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

    const columns = [
        {
            title: "收藏",
            dataIndex: "matFlowCollect",
            key:"matFlowCollect",
            render:(text,record) =>{
                return(
                    <span style={{cursor:"pointer"}} onClick={()=>collectAction(record)}>
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
            title: "任务名",
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
            title: "上次构建时间",
            dataIndex: "lastStructureTime",
            key: "lastStructureTime",
        },
        {
            title: "上次成功时间",
            dataIndex: "lastSuccessTime",
            key: "lastSuccessTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span style={{cursor:"pointer"}} onClick={() =>work(record)}>
                        {
                            record.matFlowState === 0 ?
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-yunhang"  />
                                </svg>
                                :
                                <Running/>
                        }
                    </span>
                )
            }
        },
    ]

    return  <Tables
                columns={columns}
                dataSource={matFlowList}
                rowKey={record=>record.matFlowId}
            />
}

export default inject("structureStore","matFlowStore")(observer(MatFlowTable))