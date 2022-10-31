import React,{useContext,useState} from "react";
import {Form,Input} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import SuffixStatus from "./suffixStatus";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonbefore} = props

    const context = useContext(TestContext)

    const {codeType} = context.configDataStore
    const valueChange = context.valueChange

    const [isLoading,setIsLoading] = useState(1)

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/
    const validDeploySshIp = /((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/


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

    const onBlur = e =>{
        setIsLoading(2)
        valueChange(e.target.value,name,mode,setIsLoading)
    }

    return (
       <div className="guiView-inputs">
           <Form.Item
               {...props}
               name={name}
               label={label}
               rules={rules()}
               validateTrigger="onChange"
           >
               <Input
                   placeholder={placeholder}
                   onBlur={e=>onBlur(e)}
                   addonBefore={addonbefore}
               />
           </Form.Item>
           <div className="guiView-inputs-suffix">
               {<SuffixStatus isLoading={isLoading}/>}
           </div>
       </div>
    )

}

export default observer(Inputs)