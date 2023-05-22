import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
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

    const {findAllRepository,storehouseList,findAllBranch,branchList} = xcodeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true)

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
     * @param type：类型
     */
    const onFocus = type => {
        switch (type) {
            case "codeName":
                setNameBorder(true)
                setSpin(true)
                findAllRepository(dataItem.task?.authId).then(r=>setSpin(false))
                break
            default:
                setBranchBorder(true)
                findAllBranch({
                    rpyName:dataItem.task?.codeName,
                    authId:dataItem.task?.authId,
                })
        }
    }

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_codeName"} label="仓库" rules={[{required:true, message:"请选择仓库"}]}>
                <FormsSelect
                    label="仓库"
                    isSpin={isSpin}
                    border={nameBorder}
                    onBlur={()=>setNameBorder(false)}
                    onFocus={()=>onFocus("codeName")}
                    onChange={changeGitStoreHouse}
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Select.Option key={item.rpyId} value={item.name}> {item.name} </Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>
            <Form.Item name={dataItem.taskId+"_codeBranch"} label="分支">
                <FormsSelect
                    label="分支"
                    isSpin={false}
                    border={branchBorder}
                    disabled={prohibited}
                    onBlur={()=>setBranchBorder(false)}
                    onFocus={()=>onFocus("codeBranch")}
                    onChange={changeBranch}
                >
                    {
                        branchList && branchList.map(item=>{
                            return  <Select.Option key={item.branchName} value={item.branchName}> {item.branchName} </Select.Option>
                        })
                    }
                </FormsSelect>

            </Form.Item>
        </>
    )
}

export default inject("taskStore","xcodeStore")(observer(CodeXcode))
