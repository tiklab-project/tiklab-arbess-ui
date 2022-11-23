import React from "react";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    SwapOutlined
} from "@ant-design/icons";
import {message,Popconfirm} from "antd";
import Switch from "./switch";
import Forms from "../formType/forms";
import HlineIcon from "../formTitle/hlineIcon";

const BlockContent = props =>{

    const {data,type,pipelineId,setChangeSortVisible,updateConfigure,validType,id} = props
    
    const delType = type => {
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

    const isChange = () =>{
        if(type < 10 || data && data.length < 2){
            return false
        }
        if(data && data.length === 2){
            return !data.some(item => item.dataType < 10);
        }

        return true
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
                            isChange() &&
                                <span className="headline-changSort"
                                      onClick={()=>setChangeSortVisible(true)}
                                >
                                    <SwapOutlined />
                                    更改顺序
                                </span>
                        }
                        <Popconfirm
                            title="你确定删除吗"
                            onConfirm={()=>delType(type)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span className="headline-delete">
                                <DeleteOutlined />
                                删除
                            </span>
                        </Popconfirm>
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