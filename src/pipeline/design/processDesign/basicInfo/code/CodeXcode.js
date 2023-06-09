import React, {useEffect, useState} from "react";
import {Form, Select} from "antd";
import {inject, observer} from "mobx-react";
import AuthFind from "../AuthFind";
import FormsSelect from "../FormsSelect";

/**
 * xcode
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeXcode = props =>{

    const {xcodeStore,taskStore} = props

    const {findXcodeRpy,xcodeRpy,findXcodeBranch,xcodeBranch} = xcodeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true)

    // 仓库 | 分支聚焦
    const [border,setBorder] = useState(null)

    // 仓库获取加载
    const [isSpin,setSpin] = useState(false)

    useEffect(()=>{
        // 分支是否禁止
        if(dataItem && dataItem.task?.repository?.name){
            setProhibited(false)
        }
    },[dataItem.task?.repository?.name])

    /**
     * 切换仓库
     * @param value
     */
    const changeGitStoreHouse = value =>{
        setProhibited(false)
        updateTask({
            taskId:dataItem.taskId,
            values:{repository:{id:value}}
        })
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        updateTask({
            taskId:dataItem.taskId,
            values:{branch: {id:value}}
        })
    }

    /**
     * 获取仓库||分支
     * @param type：类型
     */
    const onFocus = type => {
        setBorder(type)
        switch (type) {
            case "codeName":
                setSpin(true)
                findXcodeRpy(dataItem.task?.authId).then(r=>setSpin(false))
                break
            default:
                findXcodeBranch({
                    rpyId:dataItem.task?.repository?.id,
                    authId:dataItem.task?.authId,
                })
        }
    }

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_codeName"} label="仓库" rules={[{required:true, message:"仓库不能为空"}]}>
                <FormsSelect
                    label="仓库"
                    isSpin={isSpin}
                    border={border==='codeName'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus("codeName")}
                    onChange={changeGitStoreHouse}
                >
                    {
                        xcodeRpy && xcodeRpy.map(item=>{
                            return <Select.Option key={item.id} value={item.id}> {item.name} </Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>
            <Form.Item name={dataItem.taskId+"_codeBranch"} label="分支">
                <FormsSelect
                    label="分支"
                    isSpin={false}
                    disabled={prohibited}
                    border={border==='codeBranch'}
                    onBlur={()=>setBorder(false)}
                    onFocus={()=>onFocus("codeBranch")}
                    onChange={changeBranch}
                >
                    {
                        xcodeBranch && xcodeBranch.map(item=>{
                            return  <Select.Option key={item.id} value={item.id}> {item.name} </Select.Option>
                        })
                    }
                </FormsSelect>

            </Form.Item>
        </>
    )
}

export default inject("taskStore","xcodeStore")(observer(CodeXcode))
