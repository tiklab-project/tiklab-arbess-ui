import React from "react";
import {inject,observer} from "mobx-react";
import "./switch.scss";
import {Modal,message} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const gitList=[
    {id:1,title:"通用Git",icon:"git"} ,
    {id:2,title:"Gitee",icon:"gitee"},
    {id:3,title:"Github",icon:"github"},
    {id:4,title:"Gitlab",icon:"gitlab"},
    {id:5,title:"SVN",icon: "-_ssh"},
]

const testList=[
    {id:11,title:"单元测试",icon:"ceshi"}
]

const  buildList=[
    {id:21,title:"maven",icon:"quanxian"},
    {id:22,title:"node",icon:"nodejs"},
]

const deployList=[
    {id:31,title:"虚拟机",icon:"xuniji"},
    {id:32,title:"docker",icon:"docker"},
]

const Switch = props =>{

    const {type,configDataStore,configStore,pipelineStore,del} = props
    const {setCodeType,data,setData,setBuildType,setDeployType} = configDataStore
    const {updateConfigure} = configStore
    const {pipelineId} = pipelineStore

    // 切换类型
    const changeType = type =>{
        Modal.confirm({
            title: "切换",
            icon: <ExclamationCircleOutlined />,
            content: "切换后数据无法恢复",
            onOk:()=>chang(type),
            okText: "确认",
            cancelText: "取消",
        })
    }

    const chang = type =>{
        del(type)
        const params = {
            pipeline:{pipelineId},
            taskType:type,
            message:"updateType"
        }
        updateConfigure(params).then(res=>{
            if(res.code===50001){
                message.info(res.msg)
            }
            if(res.code===0){
                setType(type)
            }
        })
    }

    const setType = type =>{
        if(type > 0 && type < 6) {
            setCodeType(type)
        }
        else if(type > 20 && type < 30){
            setBuildType(type)
            changDataType(type,20,30)
        }
        else if(type > 30 && type < 40){
            setDeployType(type)
            changDataType(type,30,40)
        }
    }

    const changDataType = (type,min,max) =>{
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( arr[i].dataType > min && arr[i].dataType  < max) {
                arr[i].dataType = type
            }
        }
        setData([...arr])
    }

    const renderList = (list,type) =>{
        return list.map(item=>{
            return(
                <div className={`configCode-gitList-item ${type==item.id?"configCode-gitList-selected":""}`}
                     onClick={()=>changeType(item.id)}
                     key={item.id}
                >
                    <span className="configCode-gitList-item-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${item.icon}`} />
                        </svg>
                    </span>
                    <span className="configCode-gitList-item-title">
                        {item.title}
                    </span>
                </div>
            )
        })
    }

    return(
        <div className="configCode-gitList">
            {
                (()=>{
                    if(type===11){
                        return  <>
                                    <div className="configCode-gitList-title">测试类型</div>
                                    { renderList(testList,type)}
                                </>
                    }
                    else if(type > 20 && type < 30){
                        return  <>
                                    <div className="configCode-gitList-title">构建类型</div>
                                    {renderList(buildList,type)}
                                </>
                    }
                    else if(type > 30 && type < 40){
                        return  <>
                                    <div className="configCode-gitList-title">部署类型</div>
                                    {renderList(deployList,type)}
                                </>
                    }
                    else {
                        return  <>
                                    <div className="configCode-gitList-title">源码类型</div>
                                    { renderList(gitList,type)}
                                </>
                    }
                })()
            }
        </div>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(Switch))