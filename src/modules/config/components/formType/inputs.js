import React,{useState} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {LoadingOutlined,CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";
import "./inputs.scss";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure,setEnabledValid,enabledValid} = configStore
    const {setFormInitialValues,codeType} = configDataStore

    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)


    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/
    const validDeploySshIp = /((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/

    const onchange = e  => {
        switch (name){
            case "codeName":
                setFormInitialValues({codeName:e.target.value})
                break
            case "codeBranch":
                setFormInitialValues({codeBranch:e.target.value})
        }
    }

    const validation = (codeType,name,value) =>{
        switch (name) {
            case "codeName":
                if(codeType===5){
                    return validCodeSvn.test(value)
                }else if(codeType===1||codeType===4){
                    return validCodeGit.test(value)
                }
                break
            case "sshIp":
                return validDeploySshIp.test(value)
            default:
                return true
        }
    }

    const onFocus = () => {
        setBordered(true)
        setIsLoading(2)
    }

    const onBlur = (e) => {
        // 获取input 的id
        const obj = {}
        obj[name] = e.target.value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            values:obj,
            message:"update"
        }
        if(validation(codeType,name,e.target.value)){
            setEnabledValid(!enabledValid)
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
                break;
            case "sshIp":
                rule =  [
                            {required:true, message: "请输入Ip地址"},
                            {pattern:validDeploySshIp, message:"请输入正确的Ip地址"}
                        ]
                break;

        }
        return rule
    }

    const suffix = isLoading =>{
        switch (isLoading) {
            case 1:
                return <span/>
            case 2:
                return  <LoadingOutlined style={{color:"#1890ff"}}/>

            case 3:
                return <CheckCircleOutlined style={{color:"#1890ff"}}/>
            case 4:
                return <CloseCircleOutlined style={{color:"red"}}/>
        }
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
                    onChange={onchange}
                    onFocus={onFocus}
                    onBlur={(e)=>onBlur(e)}
                    addonBefore={addonBefore}
                />
            </Form.Item>
            <div className="formView-inputs-suffix">
                {suffix(isLoading)}
            </div>
        </div>
    )

}

export default inject("configStore","pipelineStore","configDataStore")(observer(Inputs))