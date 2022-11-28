import React,{useContext,useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import {x} from "../common/delData";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonbefore,isValid} = props

    const context = useContext(TestContext)

    const {formInitialValues} = context.configDataStore
    const valueChange = context.valueChange

    const [bordered,setBordered] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
        if(bordered){
            ref.current.focus()
        }else {
            ref.current.blur()
        }
    },[bordered])

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/
    
    const onFocus = () => {
        setBordered(true)

    }

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

    const onBlur = e =>{
        if(x(e.target.value,formInitialValues[name])){
            valueChange(e.target.value,name,mode)
        }
        setBordered(false)
    }

    return   <Form.Item
                name={name}
                label={label}
                rules={rules()}
                validateTrigger="onChange"
            >
                <Input
                    ref={ref}
                    addonBefore={bordered && addonbefore}
                    placeholder={bordered ? placeholder+"，回车保存":"未设置"}
                    onFocus={onFocus}
                    onBlur={(e)=>onBlur(e)}
                    onPressEnter={(e)=>{
                        onBlur(e)
                        e.target.blur()
                    }}
                />

             </Form.Item>
}

export default observer(Inputs)