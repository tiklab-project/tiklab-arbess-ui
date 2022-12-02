import React,{useContext,useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import {x} from "../common/delData";

const Inputs = props =>{

    const {placeholder,dataItem,label,name,addonbefore,isValid} = props

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
        if(isValid){
            rule = [
                {required:true,message:" "},
                ({ getFieldValue }) => ({
                    validator(rule,value) {
                        if(!value || value.trim() === ""){
                            return Promise.reject(`请输入${label}`)
                        }
                        return Promise.resolve()
                    }
                })
            ]
            if(name==="codeName"){
                switch (dataItem.type) {
                    case 1:
                    case 4:
                        rule =  [
                            {required:true, message: ""},
                            {pattern: validCodeGit, message:"请输入正确的git地址"},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    if(!value || value.trim()===""){
                                        return Promise.reject(`请输入${label}`);
                                    }
                                    return Promise.resolve()
                                }
                            }),
                        ]
                        break
                    case 5:
                        rule =  [
                            {required: true, message: ""},
                            {pattern: validCodeSvn,message:"请输入正确的svn地址"},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    if(!value || value.trim()===""){
                                        return Promise.reject(`请输入${label}`)
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]
                }
            }
        }
        return rule
    }

    const onBlur = e =>{
        if(x(e.target.value,formInitialValues[dataItem.configId+"_"+name])){
            valueChange(e.target.value,name,dataItem.type)
        }
        setBordered(false)
    }

    return   <Form.Item
                name={dataItem.configId+"_"+name}
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