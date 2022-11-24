import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import FindAuth from "./findAuth";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";

const CodeGiteeOrGithub = props =>{

    const {configDataStore,configStore,pipelineStore,authorizeStore} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {formInitialValues,codeType} = configDataStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [fieldName,setFieldName] = useState("")

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
    },[formInitialValues])

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
            pipeline:{pipelineId},
            taskType:codeType,
            values:obj,
            message:"update"
        }
        formInitialValues[key]=value
        updateConfigure(params)
    }

    const onFocus = name => {
        switch (name) {
            case "codeName":
                const param = {
                    authId:formInitialValues && formInitialValues.gitAuthId,
                    type:codeType
                }
                findAllStorehouse(param)
                break
            default:
                const params ={
                    houseName:formInitialValues && formInitialValues.codeName,
                    authId:formInitialValues && formInitialValues.gitAuthId,
                    type:codeType
                }
                findBranch(params)
        }
        setFieldName(name)
    }

    const onBlur = () => {
        setFieldName("")
    }

    return(
        <>
            <FindAuth type={codeType}/>
            <Form.Item
                name={"codeName"}
                label="仓库"
                rules={[{required:true, message:"请选择仓库"}]}
            >
                <Select
                    onChange={changeGitStoreHouse}
                    onFocus={()=>onFocus("codeName")}
                    onBlur={onBlur}
                    bordered={fieldName === "codeName"}
                    placeholder="仓库"
                    notFoundContent={<EmptyText/>}
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Select.Option key={item} value={item}> {item} </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name={"codeBranch"}
                label="分支"
            >
                <Select
                    disabled={prohibited}
                    bordered={fieldName === "codeBranch"}
                    placeholder="分支"
                    onFocus={()=>onFocus("codeBranch")}
                    onBlur={onBlur}
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

export default inject("configDataStore","configStore","pipelineStore","authorizeStore")
                (observer(CodeGiteeOrGithub))
