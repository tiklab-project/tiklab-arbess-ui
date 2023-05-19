import React,{useState,useEffect} from "react";
import {Form,Select,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../../../common/emptyText/EmptyText";
import AuthFind from "../AuthFind";

/**
 * xcode
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGiteeOrGithubOrXcode = props =>{

    const {authorizeStore,taskStore} = props

    const {findAllRepository,storehouseList,findAllBranch,branchList} = authorizeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true)

    // 选择器悬浮
    const [fieldName,setFieldName] = useState("")

    // 仓库焦点需要
    const [nameBorder,setNameBorder] = useState(false)

    // 分支焦点
    const [branchBorder,setBranchBorder] = useState(false)

    // 仓库获取加载
    const [isSpin,setSpin] = useState(false)

    useEffect(()=>{
        // 分支是否禁止
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
        updateTask({
            taskId:dataItem.taskId,
            values:{codeName:value}
        })
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        updateTask({
            taskId:dataItem.taskId,
            values:{codeBranch:value}
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
                setSpin(true)
                findAllRepository(dataItem && dataItem.task.authId).then(r=>setSpin(false))
                break
            default:
                setBranchBorder(true)
                findAllBranch({
                    rpyName:dataItem && dataItem.task.codeName,
                    authId:dataItem && dataItem.task.authId,
                })
        }
    }

    const notFoundContent = isSpin ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <EmptyText/>

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_codeName"} label="仓库" rules={[{required:true, message:"请选择仓库"}]}>
                <Select
                    showSearch={nameBorder}
                    placeholder={nameBorder ?"仓库":"未选择"}
                    className={nameBorder?'':'input-hover'}
                    showArrow={fieldName==="codeName"}
                    onMouseEnter={()=>setFieldName("codeName")}
                    onMouseLeave={()=>setFieldName("")}
                    onBlur={()=>setNameBorder(false)}
                    onFocus={()=>onFocus("codeName")}
                    onChange={changeGitStoreHouse}
                    notFoundContent={notFoundContent}
                    filterOption = {(input, option) =>
                        (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Select.Option key={item.rpyId} value={item.name}> {item.name} </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name={dataItem.taskId+"_codeBranch"} label="分支">
                <Select
                    disabled={prohibited}
                    className={branchBorder?'':'input-hover'}
                    placeholder={branchBorder?"分支":"未选择"}
                    showArrow={fieldName==="codeBranch"}
                    onMouseEnter={()=>setFieldName("codeBranch")}
                    onMouseLeave={()=>setFieldName("")}
                    onBlur={()=>setBranchBorder(false)}
                    onFocus={()=>onFocus("codeBranch")}
                    onChange={changeBranch}
                    notFoundContent={<EmptyText/>}
                >
                    {
                        branchList && branchList.map(item=>{
                            return  <Select.Option key={item.branchName} value={item.branchName}> {item.branchName} </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
        </>
    )
}

export default inject("taskStore","authorizeStore")(observer(CodeGiteeOrGithubOrXcode))
