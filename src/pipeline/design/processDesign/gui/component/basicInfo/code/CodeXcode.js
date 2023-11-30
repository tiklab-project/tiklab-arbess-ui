import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import xcodeStore from "../../../store/XCodeStore";

/**
 * xcode
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeXcode = props =>{

    const {taskStore} = props

    const {findXcodeRpy,findXcodeBranch} = xcodeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true);

    // 仓库获取加载
    const [isSpin,setSpin] = useState(false);

    // 仓库
    const [xcodeRpy,setXcodeRpy] = useState([]);
    // 分支
    const [xcodeBranch,setXcodeBranch] = useState([]);

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
        if(task && task.repository?.rpyId===value){return;}
        setProhibited(false)
        updateTask({repository: {rpyId:value}})
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        const task = dataItem.task
        if(task && task.branch?.branchId===value){return;}
        updateTask({branch: {branchId:value}})
    }

    /**
     * 获取仓库||分支
     * @param name
     */
    const onFocus = name => {
        if(!dataItem.task?.authId) return;
        if(name==='codeName'){
            setSpin(true)
            findXcodeRpy(dataItem.task?.authId).then(r=>{
                if(r.code===0){
                    setXcodeRpy(r.data)
                }
                setSpin(false)
            })
            return;
        }
        if(!dataItem.task?.repository?.rpyId) return;
        findXcodeBranch({
            rpyId:dataItem.task?.repository?.rpyId,
            authId:dataItem.task?.authId,
        }).then(r=>{
            if(r.code===0){
                setXcodeBranch(r.data)
            }
        })
    }

    return(
        <>
            <FormsAuth />
            <FormsSelect
                rules={[{required:true, message:"仓库不能为空"}]}
                name={"codeName"}
                label="仓库"
                isSpin={isSpin}
                onFocus={()=>onFocus("codeName")}
                onChange={changeGitStoreHouse}
            >
                {
                    xcodeRpy && xcodeRpy.map(item=>{
                        return <Select.Option key={item.rpyId} value={item.rpyId}> {item.name} </Select.Option>
                    })
                }
            </FormsSelect>
            <FormsSelect
                name={"codeBranch"}
                label="分支"
                isSpin={false}
                disabled={prohibited}
                onFocus={()=>onFocus("codeBranch")}
                onChange={changeBranch}
            >
                {
                    xcodeBranch && xcodeBranch.map(item=>{
                        return  <Select.Option key={item.branchId} value={item.branchId}> {item.branchName} </Select.Option>
                    })
                }
            </FormsSelect>
        </>
    )
}

export default observer(CodeXcode)
