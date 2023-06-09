import React,{useState,useRef,useEffect} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import {WhetherChange} from "../processDesign/components/Common";
import {Validation} from "../../../../common/client/Client";

/**
 * form文本框
 * task文本内容查看，编辑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FormsInput = props =>{

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
                if(type==='svn'){
                    return validCodeSvn.test(value)
                }else if(type==='git'||type==='gitlab'){
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
        // WhetherChange(e.target.value,dataItem[name])：获取内容更改状态
        // validation(e.target.value,dataItem.type,name)：效验

        const value = e.target.value

        // 文本内容效验是否通过
        const valid =  validation(value,dataItem.taskType,name)
        // 任务是否修改内容
        const isTaskChange =  WhetherChange(value,dataItem.task && dataItem.task[name])
        // 任务名称是否修改
        const isNameChange = WhetherChange(value,dataItem.taskName)
        setEnter(false)
        const params = {
            taskId:dataItem.taskId,
            values:{[name]:value}
        }
        if(valid){
            if(name==="taskName"){
                // 改变任务名称
                isNameChange && updateTaskName(params)
                return
            }
            isTaskChange && updateTask(params)
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
                {required:true,message:`${label}不能为空`},
                Validation(label),
            ]
            if(name==="codeName"){
                switch (dataItem.taskType) {
                    case 'git':
                    case 'gitlab':
                        rule =  [
                            {required:true, message:`${label}不能为空`},
                            {pattern: validCodeGit, message:"请输入正确的git地址"},
                        ]
                        break
                    case 'svn':
                        rule =  [
                            {required: true, message:`${label}不能为空`},
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

export default inject("taskStore")(observer(FormsInput))
