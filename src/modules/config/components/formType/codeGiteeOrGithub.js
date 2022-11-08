import React,{useState,useEffect} from "react";
import {Form,Select} from "antd";
import FindAuth from "./findAuth";
import {inject,observer} from "mobx-react";
import SuffixStatus from "./suffixStatus";

const CodeGiteeOrGithub = props =>{

    const {configDataStore,configStore,pipelineStore,authorizeStore} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {formInitialValues,codeType} = configDataStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [fieldName,setFieldName] = useState("")
    const [isLoading,setIsLoading] = useState(1)

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
        setIsLoading(2)
        const obj = {}
        obj[key] = value
        const params = {
            pipeline:{pipelineId},
            taskType:codeType,
            values:obj,
            message:"update"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                setIsLoading(3)
            }else {
                setIsLoading(4)
            }
            setTimeout(()=>setIsLoading(1),1000)
        })
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
            <FindAuth type={codeType} {...props}/>
            <div className="formView-inputs">
                <Form.Item
                    label="仓库"
                    name={"codeName"}
                    rules={[{required:true, message:"请选择仓库"}]}
                >
                    <Select
                        onChange={changeGitStoreHouse}
                        onFocus={()=>onFocus("codeName")}
                        onBlur={onBlur}
                        bordered={fieldName === "codeName"}
                        placeholder="仓库"
                    >
                        {
                            storehouseList && storehouseList.map(item=>{
                                return <Select.Option key={item} value={item}> {item} </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div className="formView-inputs-suffix">
                    {fieldName === "codeName" &&
                        <SuffixStatus isLoading={isLoading}/>
                    }
                </div>
            </div>
            <div className="formView-inputs">
                <Form.Item label="分支"  name={"codeBranch"}>
                    <Select
                        disabled={prohibited}
                        bordered={fieldName === "codeBranch"}
                        placeholder="分支"
                        onFocus={()=>onFocus("codeBranch")}
                        onBlur={onBlur}
                        onChange={changeBranch}
                    >
                        {
                            branchList && branchList.map(item=>{
                                return  <Select.Option key={item} value={item}> {item} </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div className="formView-inputs-suffix">
                    {
                        fieldName === "codeBranch" &&
                        <SuffixStatus isLoading={isLoading}/>
                    }
                </div>
            </div>
        </>
    )
}

export default inject("configDataStore","configStore","pipelineStore","authorizeStore")
                (observer(CodeGiteeOrGithub))
