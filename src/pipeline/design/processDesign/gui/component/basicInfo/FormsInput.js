/**
 * @Description: 任务文本框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {WhetherChange} from "../Common";
import {Validation} from "../../../../../../common/utils/Client";

const FormsInput = props =>{

    const {placeholder,label,name,addonBefore,isRequire,taskStore} = props

    const {dataItem,updateTask,taskPermissions} = taskStore

    const inputRef = useRef(null)
    const [enter,setEnter] = useState(false)

    const taskUpdate = taskPermissions?.includes('pipeline_task_update');

    useEffect(()=>{
        // 文本框聚焦
        if(enter){
            inputRef.current.focus()
        }else {
            inputRef.current.blur()
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
                if(type==='svn'){
                    return validCodeSvn.test(value)
                }else if(type==='git'||type==='gitlab'){
                    return validCodeGit.test(value)
                }
                break
            default:
                if(isRequire){
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
        const value = e.target.value
        // 文本内容效验是否通过
        const valid =  validation(value,dataItem.taskType,name)
        const isTaskChange =  WhetherChange(value,dataItem.task?.[name])
        setEnter(false)
        if(valid && isTaskChange){
            updateTask({[name]:value})
        }
    }

    /**
     * 设置表单校验规则
     */
    const rules = () =>{
        if (!isRequire) {
            return;
        }
        let rule = [
            { required: true, message: `${label}不能为空` },
            Validation(label),
        ];
        if (name === "codeName") {
            switch (dataItem.taskType) {
                case 'git':
                case 'gitlab':
                    rule = [
                        { required: true, message: `${label}不能为空` },
                        { pattern: validCodeGit, message: "请输入正确的git地址" },
                    ];
                    break;
                case 'svn':
                    rule = [
                        { required: true, message: `${label}不能为空` },
                        { pattern: validCodeSvn, message: "请输入正确的svn地址" },
                    ];
                    break;
                default:
                    break;
            }
        }
        return rule;
    }

    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules()}
            validateTrigger="onChange"
        >
            <Input
                disabled={!taskUpdate}
                ref={inputRef}
                addonBefore={enter && addonBefore}
                placeholder={enter? placeholder+"，回车保存":"未设置"}
                className={`${enter ? '':'input-hover'}`}
                onFocus={()=>setEnter(true)}
                onBlur={(e)=>onBlur(e)}
                onPressEnter={(e)=>e.target.blur()}
            />
        </Form.Item>
    )

}

export default inject("taskStore")(observer(FormsInput))
