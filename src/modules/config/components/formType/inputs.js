import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {x} from "../common/delData";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,isValid,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {formInitialValues} = configDataStore

    const [bordered,setBordered] = useState(false)
    const [enter,setEnter] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
        if(enter){
            ref.current.focus()
        }else {
            ref.current.blur()
        }
    },[enter])


    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/

    const onFocus = () => {
        setBordered(true)
        setEnter(true)
    }

    // 效验
    const validation = (value,mode,name) =>{
        switch (name) {
            case "codeName":
                if(mode===5){
                    return validCodeSvn.test(value)
                }else if(mode===1||mode===4){
                    return validCodeGit.test(value)
                }
                break
            default:
                if(isValid){
                    return value && value.trim() !== ""
                }else {
                    return true
                }
        }
    }

    const onBlur = e => {
        // 效验
        validation(e.target.value,mode,name) && setBordered(false)
        if(x(e.target.value,formInitialValues[name])){
            const obj = {}
            obj[name] = e.target.value
            formInitialValues[name]=obj[name]
            const params = {
                pipeline:{pipelineId},
                taskType:mode,
                values:obj,
                message:"update"
            }
            updateConfigure(params).then(res=>{
                if(res.code===0){
                    document.getElementById(name).classList.remove("formView-validateFields")
                }
            })
        }
        setEnter(false)
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
                switch (mode) {
                    case 1:
                    case 4:
                        rule =  [
                            {required:true, message: ""},
                            {pattern: validCodeGit, message:"请输入正确的git地址"},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    if(!value || value.trim() === ""){
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
                                    if(!value || value.trim() === ""){
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

    
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules()}
            validateTrigger="onChange"
        >
            <Input
                ref={ref}
                bordered={bordered}
                addonBefore={enter && addonBefore}
                placeholder={enter? placeholder+"，回车保存":"未设置"}
                onFocus={onFocus}
                onBlur={(e)=>onBlur(e)}
                onPressEnter={(e)=>{
                    onBlur(e)
                    e.target.blur()
                }}
            />
        </Form.Item>
    )

}

export default inject("configStore","pipelineStore","configDataStore")(observer(Inputs))