import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../../common/emptyText/EmptyText";
import FindAuth from "../FindAuth";

/**
 * 源码 -- Gitee && Github
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGiteeOrGithub = props =>{

    const {configStore,pipelineStore,authorizeStore,dataItem} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {pipeline} = pipelineStore
    const {updateTaskConfig} = configStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true)

    const [fieldName,setFieldName] = useState("")
    const [nameBorder,setNameBorder] = useState(false)
    const [branchBorder,setBranchBorder] = useState(false)

    // 分支是否可点击
    useEffect(()=>{
        if(dataItem && dataItem.codeName){
            setProhibited(false)
        }
        setFieldName("")
    },[dataItem.codeName,pipeline])

    // 选择仓库地址
    const changeGitStoreHouse = value =>{
        setProhibited(false)
        change("codeName",value)
    }

    // 选择分支
    const changeBranch = value => {
        change("codeBranch",value)
    }

    const change = (key,value)=>{
        const obj = {}
        obj[key] = value
        const params = {
            pipeline:{id:pipeline.id},
            taskType:dataItem.type,
            taskId:dataItem.taskId,
            values:obj,
        }
        updateTaskConfig(params)
    }

    const onFocus = name => {
        switch (name) {
            case "codeName":
                const param = {
                    authId:dataItem.authId,
                    type:dataItem.type
                }
                setNameBorder(true)
                findAllStorehouse(param)
                break
            default:
                const params ={
                    houseName:dataItem && dataItem.codeName,
                    authId:dataItem && dataItem.authId,
                    type:dataItem.type
                }
                setBranchBorder(true)
                findBranch(params)
        }
    }

    return(
        <>
            <FindAuth dataItem={dataItem}/>

            <Form.Item name={dataItem.taskId+"_codeName"} label="仓库" rules={[{required:true, message:"请选择仓库"}]}>
                <Select
                    // bordered={nameBorder}
                    showSearch={nameBorder}
                    className={fieldName === "codeName"?'input-hover':''}
                    // className={fieldName === "codeName"?'':'input-hover'}
                    placeholder={nameBorder ?"仓库":"未选择"}
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

export default inject("configStore","pipelineStore","authorizeStore")
(observer(CodeGiteeOrGithub))
