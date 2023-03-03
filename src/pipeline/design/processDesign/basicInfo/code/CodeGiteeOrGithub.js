import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../../../common/emptyText/EmptyText";
import AuthFind from "../AuthFind";

/**
 * 源码 -- Gitee && Github
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

    // 选择器悬浮
    const [fieldName,setFieldName] = useState("")

    // 仓库焦点需要
    const [nameBorder,setNameBorder] = useState(false)

    // 分支焦点
    const [branchBorder,setBranchBorder] = useState(false)

    useEffect(()=>{
        // 分支是否状态
        if(dataItem && dataItem.task.codeName){
            setProhibited(false)
        }
        setFieldName("")
    },[dataItem.task.codeName])

    /**
     * 切换仓库
     * @param value
     */
    const changeGitStoreHouse = value =>{
        setProhibited(false)
        change("codeName",value)
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        change("codeBranch",value)
    }

    /**
     * 确定切换
     * @param key
     * @param value
     */
    const change = (key,value)=>{
        const obj = {}
        obj[key] = value
        updateTask({
            taskId:dataItem.taskId,
            values:obj
        })
    }

    /**
     * 获取仓库||分支
     * @param name
     */
    const onFocus = name => {
        switch (name) {
            case "codeName":
                setNameBorder(true)
                findAllStorehouse({
                    authId:dataItem && dataItem.task.authId,
                    type:dataItem && dataItem.task.type
                })
                break
            default:
                setBranchBorder(true)
                findBranch({
                    houseName:dataItem && dataItem.task.codeName,
                    authId:dataItem && dataItem.task.authId,
                    type:dataItem.taskType
                })
        }
    }

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_codeName"} label="仓库" rules={[{required:true, message:"请选择仓库"}]}>
                <Select
                    // bordered={nameBorder}
                    showSearch={nameBorder}
                    placeholder={nameBorder ?"仓库":"未选择"}
                    className={fieldName === "codeName"?'input-hover':''}
                    showArrow={fieldName === "codeName"}
                    onMouseEnter={()=>setFieldName("codeName")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeName")}
                    onBlur={()=>setNameBorder(false)}
                    onChange={changeGitStoreHouse}
                    notFoundContent={<EmptyText/>}
                    filterOption = {(input, option) =>
                        (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Select.Option key={item} value={item}> {item} </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name={dataItem.taskId+"_codeBranch"} label="分支">
                <Select
                    // bordered={branchBorder}
                    disabled={prohibited}
                    className={branchBorder?'':'input-hover'}
                    placeholder={branchBorder?"分支":"未选择"}
                    showArrow={fieldName === "codeBranch"}
                    onMouseEnter={()=>setFieldName("codeBranch")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeBranch")}
                    onBlur={()=>setBranchBorder(false)}
                    onChange={changeBranch}
                    notFoundContent={<EmptyText/>}
                >
                    {
                        branchList && branchList.map(item=>{
                            return  <Select.Option key={item} value={item}> {item} </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
        </>
    )
}

export default inject("taskStore","authorizeStore")(observer(CodeGiteeOrGithub))
