import React,{useContext,useState} from "react";
import {Form,Input} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import SuffixStatus from "./suffixStatus";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonbefore,isValid} = props

    const context = useContext(TestContext)

    const {formInitialValues} = context.configDataStore
    const valueChange = context.valueChange

    const [isLoading,setIsLoading] = useState(1)

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/

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

    const rules = () =>{
        let rule
        switch (name) {
            case "codeName":
                if(mode===5){
                    rule =  [
                        {required:true, message: "请输入svn地址"},
                        {pattern: validCodeSvn, message:"请输入正确的svn地址"}
                    ]
                }else if(mode===1 || mode===4){
                    rule =  [
                        {required:true, message: "请输入git地址"},
                        {pattern: validCodeGit, message:"请输入正确的git地址"}
                    ]
                }
                break;
            default:
                if(isValid){
                    rule = [{required:true,message:`请输入${label}`}]
                }

        }
        return rule
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

    const onBlur = e =>{
        if(x(e.target.value,formInitialValues[name])){
            if(validation(mode,name,e.target.value)){
                valueChange(e.target.value,name,mode,setIsLoading)
            }else {
                setIsLoading(4)
                setTimeout(()=>setIsLoading(1),1000)
            }
        }
    }

    return (
       <div className="guiView-inputs">
           <Form.Item
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