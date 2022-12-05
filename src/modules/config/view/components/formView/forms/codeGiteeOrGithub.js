import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import FindAuth from "./findAuth";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../../../common/emptyText/emptyText";
import {del} from "../../delData";

const CodeGiteeOrGithub = props =>{

    const {configStore,pipelineStore,authorizeStore,dataItem} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {pipelineId} = pipelineStore
    const {updateConfigure,formInitialValues} = configStore

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [fieldName,setFieldName] = useState("")
    const [nameBorder,setNameBorder] = useState(false)
    const [branchBorder,setBranchBorder] = useState(false)

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
        setFieldName("")
    },[formInitialValues,pipelineId])

    // 选择仓库地址
    const changeGitStoreHouse = (value,e) =>{
        setProhibited(false)
        change("_codeName",value)
    }

    // 选择分支
    const changeBranch = value => {
        change("_codeBranch",value)
    }

    const change = (key,value)=>{
        const obj = {}
        obj[dataItem.configId+key] = value
        const params = {
            pipeline:{pipelineId},
            taskType:dataItem.type,
            values:obj,
            configId:dataItem.configId,
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                formInitialValues[key]=value
                switch (key) {
                    case "_codeName":
                        del("giteeBranch",configStore)
                        setNameBorder(false)
                        break
                    case "codeBranch":
                        setBranchBorder(false)
                }
            }
        })
    }

    const onFocus = name => {
        switch (name) {
            case "codeName":
                const param = {
                    authId:formInitialValues && formInitialValues[dataItem.configId+"_authId"],
                    type:dataItem.type
                }
                setNameBorder(true)
                findAllStorehouse(param)
                break
            default:
                const params ={
                    houseName:formInitialValues && formInitialValues[dataItem.configId+"_codeName"],
                    authId:formInitialValues && formInitialValues[dataItem.configId+"_authId"],
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
                    showSearch={nameBorder}
                    bordered={nameBorder}
                    placeholder={nameBorder ?"仓库":"未选择"}
                    showArrow={fieldName === "codeName"}
                    onMouseEnter={()=>setFieldName("codeName")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeName")}
                    onChange={(value,e)=>changeGitStoreHouse(value,e)}
                    onBlur={()=>setNameBorder(false)}
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
                    disabled={prohibited}
                    bordered={branchBorder}
                    placeholder={branchBorder?"分支":"未选择"}
                    showArrow={fieldName === "codeBranch"}
                    onMouseEnter={()=>setFieldName("codeBranch")}
                    onMouseLeave={()=>setFieldName("")}
                    onFocus={()=>onFocus("codeBranch")}
                    onBlur={()=>setBranchBorder(false)}
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
