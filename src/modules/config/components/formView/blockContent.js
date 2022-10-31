import React from "react";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    SwapOutlined
} from "@ant-design/icons";
import {Modal,message} from "antd";
import Switch from "./switch";
import Forms from "../formType/forms";
import TitleType from "../formTitle/titleType";

const BlockContent = props =>{

    const {type,del,data,setData,pipelineId,setChangeSortVisible,updateConfigure,
        validType,id
    } = props

    const delType = type =>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>confirm(type),
            okText: "确认",
            cancelText: "取消",
        })
    }
    
    const confirm = type => {
        const params = {
            pipeline:{pipelineId},
            taskType:type,
            message:"delete"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                del(type)
                for (let i = 0 ;i<data.length;i++){
                    if(data[i].dataType === type){
                        data.splice(i,1)
                    }
                    setData([...data])
                }
            }
            if(res.code===50001){
                message.info(res.msg)
            }
        })
    }
    
    const renderValidType = () => {
        return validType && validType.map(item=>{
            return  item==type && <span key={item} className="desc-warn">
                <ExclamationCircleOutlined />
            </span>
        })
    }
    
    return(
        <>
            <div className="formView-wrapper" id={id}>
                <div className="formView-wrapper-Headline">
                    <div className="desc-left">
                        <TitleType type={type}/>
                        {renderValidType()}
                    </div>
                    <div className="desc-right">
                        {
                            type >10 &&
                                <span className="desc-changSort"
                                      onClick={()=>setChangeSortVisible(true)}
                                >
                                    <SwapOutlined />
                                    更改顺序
                                </span>
                        }
                        <span className="desc-delete"
                              onClick={()=>delType(type)}
                        >
                            <DeleteOutlined />
                            删除
                        </span>
                    </div>
                </div>
                <Switch type={type}/>
                <div className="formView-wrapper-forms">
                    <Forms type={type}/>
                </div>
            </div>
        </>
    )
}

export default BlockContent