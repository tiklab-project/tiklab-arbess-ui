import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {x} from "../../delData";

const Inputs = props =>{

    const {placeholder,label,name,addonBefore,configStore,isValid,pipelineStore,dataItem} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure,formInitialValues} = configStore

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
    const validation = (value,type,name) =>{
        switch (name) {
            case "codeName":
                if(type===5){
                    return validCodeSvn.test(value)
                }else if(type===1||type===4){
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
        validation(e.target.value,dataItem.type,name) && setBordered(false)
        // 值是否个更改
        if(x(e.target.value,formInitialValues[dataItem.configId+"_"+name])){
            const obj = {}
            obj[name] = e.target.value
            formInitialValues[dataItem.configId+"_"+name]=obj[name]
            const params = {
                pipeline:{pipelineId},
                taskType:dataItem.type,
                configId:dataItem.configId,
                values:obj,
            }
            updateConfigure(params).then(res=>{
                if(res.code===0){
                    document.getElementById(dataItem.configId+"_"+name).classList.remove("formView-validateFields")
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

    
    return (
        <Form.Item
            name={dataItem.configId+"_"+name}
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

export default inject("configStore","pipelineStore")(observer(Inputs))