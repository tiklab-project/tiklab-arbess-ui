import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {WhetherChange} from "../processDesign/components/Common";

/**
 * form文本框
 * task文本内容查看，编辑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Inputs = props =>{

    const {placeholder,label,name,addonBefore,isValid,taskStore} = props

    const {dataItem,updateTask,updateTaskName} = taskStore

    const ref = useRef(null)
    const [enter,setEnter] = useState(false)

    useEffect(()=>{
        // 文本框聚焦
        if(enter){
            ref.current.focus()
        }else {
            ref.current.blur()
        }
    },[enter])

    // Git正则表达
    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    // Svn正则表达
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/

    /**
     * form效验
     * @param value
     * @param type
     * @param name
     * @returns {boolean}
     */
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

    /**
     * 更新文本
     * @param e
     */
    const onBlur = e => {
        //  WhetherChange(e.target.value,dataItem[name]) -- 值是否个更改
        //  validation(e.target.value,dataItem.type,name) -- 效验
        const valid =  validation(e.target.value,dataItem.taskType,name)
        const isChange =  WhetherChange(e.target.value,dataItem.task && dataItem.task[name])

        const obj = {}
        obj[name] = e.target.value
        setEnter(false)
        if(valid){
            if(name==="taskName"){
                if(WhetherChange(e.target.value,dataItem.taskName)){
                    updateTaskName({
                        taskId:dataItem.taskId,
                        values:obj
                    })
                }
            }else {
                if(isChange){
                    updateTask({
                        taskId:dataItem.taskId,
                        values:obj
                    })
                }
            }
        }
    }

    /**
     * 设置表单校验规则
     * @returns {[{message: string, required: boolean},(function({getFieldValue: *}): {validator(*, *): (Promise<never>)})]}
     */
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
                switch (dataItem.taskType) {
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
            name={dataItem && dataItem.taskId+"_"+name}
            label={label}
            rules={rules()}
            validateTrigger="onChange"
        >
            <Input
                ref={ref}
                // bordered={enter}
                addonBefore={enter && addonBefore}
                placeholder={enter? placeholder+"，回车保存":"未设置"}
                className={`${enter?'':'input-hover'}`}
                onFocus={()=>setEnter(true)}
                onBlur={(e)=>onBlur(e)}
                onPressEnter={(e)=>e.target.blur()}
            />
        </Form.Item>
    )

}

export default inject("taskStore")(observer(Inputs))
