import React,{useState} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {setFormInitialValues,codeType} = configDataStore
    const [warnContent,setWornContent] = useState("")

    const onchange = e  => {
        switch (name){
            case "codeName":
                setFormInitialValues({codeName:e.target.value})
                break
            case "codeBranch":
                setFormInitialValues({codeBranch:e.target.value})
        }
    }

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/
    const validDeploySshIp = /((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/

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

    const valueChange = (e) => {
        // 获取input 的id
        const obj = {}
        obj[name] = e.target.value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            message:"update"
        }
        if(validation(codeType,name,e.target.value)){
            updateConfigure(params).then(res=>{
                // if(res.code===50001){
                //     message.info(res.msg)
                // }else if(res.code===50002){
                //     setWornContent(res.msg)
                // }
                setWornContent(res.code)
                // else {
                //     id.classList.add("ant-input-error")
                // }
            })
        }
    }

    const rules = () =>{
        let rule
        switch (name) {
            case "codeName":
                if(codeType===5){
                    rule =  [{
                                pattern: validCodeSvn,
                                message:"请输入正确的svn地址"
                            }]
                }else if(codeType===1 || codeType===4){
                    rule =  [{
                                pattern: validCodeGit,
                                message:"请输入正确的git地址"
                            }]
                }
                break;
            case "sshIp":
                rule =  [{
                            pattern:validDeploySshIp,
                            message:"请输入正确的Ip地址"
                        }]
                break;

        }
        return rule
    }

    return (
       <>
           <Form.Item
               name={name}
               label={label}
               rules={rules()}
               validateTrigger="onChange"
           >
               <Input
                   bordered={false}
                   placeholder={placeholder}
                   onChange={name==="codeName" || name==="codeBranch" ? onchange:null}
                   onBlur={(e)=>valueChange(e)}
                   addonBefore={addonBefore?addonBefore:null}
               />
           </Form.Item>
           <span>
               {/*{warnContent}*/}
           </span>
       </>
    )

}

export default inject("configStore","pipelineStore","configDataStore")(observer(Inputs))