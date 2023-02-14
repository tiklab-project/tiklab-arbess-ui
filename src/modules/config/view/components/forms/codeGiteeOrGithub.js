import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../../common/emptyText/emptyText";
import FindAuth from "./findAuth";

const CodeGiteeOrGithub = props =>{

    const {configStore,pipelineStore,authorizeStore,dataItem} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {pipeline} = pipelineStore
    const {updateTaskConfig} = configStore

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [fieldName,setFieldName] = useState("")
    const [nameBorder,setNameBorder] = useState(false)
    const [branchBorder,setBranchBorder] = useState(false)

    useEffect(()=>{
        if(dataItem && dataItem.codeName){
            setProhibited(false)
        }
        setFieldName("")
    },[dataItem.codeName,pipeline])

    // 选择仓库地址
    const changeGitStoreHouse = (value,e) =>{
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
            values:obj,
            configId:dataItem.configId,
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

            <Form.Item
                name={dataItem.configId+"_codeName"}
                label="仓库"
                rules={[{required:true, message:"请选择仓库"}]}
            >
                <Select
                    bordered={nameBorder}
                    className={nameBorder?'':'input-hover'}
                    showSearch={nameBorder}
                    placeholder={nameBorder ?"仓库":"未选择"}
                    showArrow={fieldName === "codeName"}
                    onMouseEnter={()=>setFieldName("codeName")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeName")}
                    onChange={(value,e)=>changeGitStoreHouse(value,e)}
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
            <Form.Item
                name={dataItem.configId+"_codeBranch"}
                label="分支"
            >
                <Select
                    bordered={branchBorder}
                    className={branchBorder?'':'input-hover'}
                    disabled={prohibited}
                    placeholder={branchBorder?"分支":"未选择"}
                    showArrow={fieldName === "codeBranch"}
                    onMouseEnter={()=>setFieldName("codeBranch")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeBranch")}
                    onChange={(value,e)=>changeBranch(value,e)}
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
