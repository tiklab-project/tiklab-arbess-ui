import React,{useState,useEffect} from "react";
import {Form,Input,message} from "antd";
import {inject,observer} from "mobx-react";
import SuffixStatus from "./suffixStatus";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,isValid,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {formInitialValues} = configDataStore

    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)
    const [validateStatus,setValidateStatus] = useState("")

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

    const x = (newValue,lastValue) => {
        if (newValue == null){
            return false;
        }
        if (newValue === "" && lastValue == null){
            return false;
        }
        return newValue !== lastValue;
    }


    const onBlur = e => {
        if(x(e.target.value,formInitialValues[name])){
            setIsLoading(2)
            const obj = {}
            obj[name] = e.target.value
            formInitialValues[name]=obj[name]
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
            }
            else {
                setIsLoading(4)
                setBordered(true)
            }
            setTimeout(()=>setIsLoading(1),1000)
        }
        else {
            setBordered(false)
        }
    }

    const rules = () =>{
        let rule
        if(isValid){
            rule = [{required:true,message:`请输入${label}`}]
            if(name==="codeName"){
                switch (mode) {
                    case 1:
                    case 4:
                        rule =  [
                            {required:true, message: `请输入${label}`},
                            {pattern: validCodeGit, message:"请输入正确的git地址"}
                        ]
                        break
                    case 5:
                        rule =  [
                            {required: true, message: `请输入${label}`},
                            {pattern: validCodeSvn, message:"请输入正确的svn地址"}
                        ]
                }
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
                // hasFeedback
                // validateStatus={validateStatus}
            >
                <Input
                    bordered={bordered}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={(e)=>onBlur(e)}
                    onPressEnter={(e)=>{
                        onBlur(e)
                        e.target.blur()
                    }}
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