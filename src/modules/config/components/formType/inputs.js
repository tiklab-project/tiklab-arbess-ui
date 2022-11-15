import React,{useState} from "react";
import {Form,Input,message} from "antd";
import {inject,observer} from "mobx-react";
import SuffixStatus from "./suffixStatus";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,isValid,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {codeType} = configDataStore

    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/

    const onFocus = () => {
        setBordered(true)
    }

    // 效验
    const validation = (mode,name,value) =>{
        switch (name) {
            case "codeName":
                if(mode===5){
                    return validCodeSvn.test(value)
                }else if(mode===1||mode===4){
                    return validCodeGit.test(value)
                }
                break
            default:
                return !(isValid && !value)
        }
    }

    const onBlur = e => {

        setIsLoading(2)

        const obj = {}
        obj[name] = e.target.value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            values:obj,
            message:"update"
        }
        if(validation(mode,name,e.target.value)){
            updateConfigure(params).then(res=>{
                if(res.code===0){
                    document.getElementById(name).classList.remove("formView-validateFields")
                    setIsLoading(3)
                }else {
                    setIsLoading(4)
                    message.info(res.msg)
                }
            })
            setBordered(false)
        }else {
            setBordered(true)
            setIsLoading(4)
        }

        setTimeout(()=>setIsLoading(1),1000)
    }

    const rules = () =>{
        let rule
        switch (name) {
            case "codeName":
                if(codeType===5){
                    rule =  [
                                {required:true, message: "请输入svn地址"},
                                {pattern: validCodeSvn, message:"请输入正确的svn地址"}
                            ]
                }else if(codeType===1 || codeType===4){
                    rule =  [
                                {required:true, message: "请输入git地址"},
                                {pattern: validCodeGit, message:"请输入正确的git地址"}
                            ]
                }
                break
            default:
                if(isValid){
                    rule = [{required:true,message:`请输入${label}`}]
                }
        }
        return rule
    }

    return (
        <div className="formView-inputs">
            <Form.Item
                name={name}
                label={label}
                rules={rules()}
                validateTrigger="onChange"
            >
                <Input
                    bordered={bordered}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={(e)=>onBlur(e)}
                    addonBefore={addonBefore}
                />
            </Form.Item>
            <div className="formView-inputs-suffix">
                <SuffixStatus isLoading={isLoading}/>
            </div>
        </div>
    )

}

export default inject("configStore","pipelineStore","configDataStore")(observer(Inputs))