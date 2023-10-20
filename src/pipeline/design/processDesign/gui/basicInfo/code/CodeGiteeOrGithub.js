import React,{useState,useEffect} from "react";
import {Select} from "antd";
import {inject,observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";

/**
 * gitee & github
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGiteeOrGithub = props =>{

    const {authorizeStore,taskStore} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true)

    // 仓库获取加载状态
    const [isSpin,setSpin] = useState(false)

    useEffect(()=>{
        // 分支是否禁止
        if(dataItem?.task?.codeName){
            setProhibited(false)
        }
    },[dataItem?.task?.codeName])

    /**
     * 切换仓库
     * @param value
     */
    const changeGitStoreHouse = value =>{
        setProhibited(false)
        updateTask({codeName:value})
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        updateTask({codeBranch:value})
    }

    /**
     * 获取仓库||分支
     * @param name
     */
    const onFocus = name => {
        if(!dataItem.task?.authId) return;
        if(name==="codeName"){
            setSpin(true)
            findAllStorehouse(dataItem.task?.authId).then(r=>setSpin(false))
            return;
        }
        if(!dataItem.task?.codeName) return;
        findBranch({
            houseName:dataItem.task?.codeName,
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
                    storehouseList && storehouseList.map(item=>{
                        return <Select.Option key={item} value={item}> {item} </Select.Option>
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
                    branchList && branchList.map(item=>{
                        return  <Select.Option key={item} value={item}> {item} </Select.Option>
                    })
                }
            </FormsSelect>
        </>
    )
}

export default inject("taskStore","authorizeStore")(observer(CodeGiteeOrGithub))
