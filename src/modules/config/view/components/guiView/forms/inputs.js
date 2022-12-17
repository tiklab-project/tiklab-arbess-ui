import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {x} from "../../delData";

const Inputs = props =>{

    const {placeholder,label,name,addonBefore,dataItem,isValid,pipelineStore,configStore} = props

    const {pipelineId} = pipelineStore
    const {updateTaskConfig} = configStore

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
        /*
            x(e.target.value,dataItem[name]) -- 值是否个更改
            validation(e.target.value,dataItem.type,name) -- 效验
        */
        if(x(e.target.value,dataItem[name]) && validation(e.target.value,dataItem.type,name)){
            const obj = {}
            obj[name] = e.target.value
            dataItem[name] = e.target.value
            const params = {
                pipeline:{id:pipelineId},
                taskType:dataItem.type,
                configId:dataItem.configId,
                values:obj,
            }
            updateTaskConfig(params)
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
                            {required:true, message:`请输入${label}`},
                            {pattern: validCodeGit, message:"请输入正确的git地址"},
                        ]
                        break
                    case 5:
                        rule =  [
                            {required: true, message:`请输入${label}`},
                            {pattern: validCodeSvn,message:"请输入正确的svn地址"},
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
                addonBefore={enter && addonBefore}
                placeholder={enter? placeholder+"，回车保存":"未设置"}
                onFocus={onFocus}
                onBlur={(e)=>onBlur(e)}
                onPressEnter={(e)=>{  
                    // onBlur(e)                  
                    e.target.blur()
                }}
            />
        </Form.Item>
    )

}

export default inject("configStore","pipelineStore")(observer(Inputs))