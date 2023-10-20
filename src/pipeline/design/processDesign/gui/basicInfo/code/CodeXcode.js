import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {inject, observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
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

    // 仓库获取加载
    const [isSpin,setSpin] = useState(false)

    useEffect(()=>{
        // 分支是否禁止
        if(dataItem.task?.repository?.name){
            setProhibited(false)
        }
    },[dataItem.task?.repository?.name])

    /**
     * 切换仓库
     * @param value
     */
    const changeGitStoreHouse = value =>{
        const task = dataItem.task
        if(task && task.repository?.id===value){return;}
        setProhibited(false)
        updateTask({repository: {id:value}})
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        const task = dataItem.task
        if(task && task.branch?.id===value){return;}
        updateTask({branch: {id:value}})
    }

    /**
     * 获取仓库||分支
     * @param name
     */
    const onFocus = name => {
        if(!dataItem.task?.authId) return;
        if(name==='codeName'){
            setSpin(true)
            findXcodeRpy(dataItem.task?.authId).then(r=>setSpin(false))
            return;
        }
        if(!dataItem.task?.repository?.id) return;
        findXcodeBranch({
            rpyId:dataItem.task?.repository?.id,
            authId:dataItem.task?.authId,
        })
    }

    return(
        <>
            <FormsAuth />
            <FormsSelect
                rules={[{required:true, message:"仓库不能为空"}]}
                name={dataItem.taskId+"_codeName"}
                label="仓库"
                isSpin={isSpin}
                onFocus={()=>onFocus("codeName")}
                onChange={changeGitStoreHouse}
            >
                {
                    xcodeRpy && xcodeRpy.map(item=>{
                        return <Select.Option key={item.id} value={item.id}> {item.name} </Select.Option>
                    })
                }
            </FormsSelect>
            <FormsSelect
                name={dataItem.taskId+"_codeBranch"}
                label="分支"
                isSpin={false}
                disabled={prohibited}
                onFocus={()=>onFocus("codeBranch")}
                onChange={changeBranch}
            >
                {
                    xcodeBranch && xcodeBranch.map(item=>{
                        return  <Select.Option key={item.id} value={item.id}> {item.name} </Select.Option>
                    })
                }
            </FormsSelect>
        </>
    )
}

export default inject("taskStore","xcodeStore")(observer(CodeXcode))
