import React from "react";
import {Modal} from "antd";
import {Prompt} from "react-router-dom";

// 离开编辑页面全局提示
const PromptContent = props =>{
    const {isPrompt,confirmLeave,confirmStay} = props
    return <Prompt
        when={isPrompt}
        message={location =>{
            if(!isPrompt){
                return true
            }
            Modal.confirm({
                title:"有编辑未保存，确定离开吗",
                okText:"离开",
                cancelText:"取消",
                onOk:()=>confirmLeave(location.pathname),
                onCancel:()=>confirmStay ? confirmStay() : null
            })
            return false
        }}
    />
}

export default PromptContent