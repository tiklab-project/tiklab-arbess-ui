import React from "react";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    SwapOutlined
} from "@ant-design/icons";
import {Modal,message} from "antd";
import Switch from "./switch";
import Forms from "../formType/forms";
import HlineIcon from "../formTitle/hlineIcon";

const BlockContent = props =>{

    const {type,pipelineId,setChangeSortVisible,updateConfigure,validType,id} = props

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
            if(res.code===50001){
                message.info(res.msg)
            }
        })
    }
    
    const renderValidType = () => {
        return validType && validType.map((item,index)=>{
            return  item==type && <ExclamationCircleOutlined key={index} style={{fontSize:16,color:"#ff0000"}}/>
        })
    }
    
    return(
        <>
            <div className="formView-wrapper" id={id}>
                <div className="formView-wrapper-Headline">
                    <div className="headline-left">
                        <HlineIcon type={type}/>
                        {renderValidType()}
                    </div>
                    <div className="headline-right">
                        {
                            type >10 &&
                                <span className="headline-changSort"
                                      onClick={()=>setChangeSortVisible(true)}
                                >
                                    <SwapOutlined />
                                    更改顺序
                                </span>
                        }
                        <span className="headline-delete"
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