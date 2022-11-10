import React,{useState,useEffect,useContext} from "react";
import {Form,Select} from "antd";
import {observer} from "mobx-react";
import authorizeStore from "../../store/authorizeStore";
import TestContext from "../common/testContext";
import SuffixStatus from "./suffixStatus";
import FindAuth from "../auth/findAuth";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore

    const context = useContext(TestContext)

    const {formInitialValues,codeType} = context.configDataStore
    const valueChange = context.valueChange

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [isLoading,setIsLoading] = useState(1)
    const [fieldName,setFieldName] = useState("")

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
    },[formInitialValues])

    // 选择仓库地址
    const changeGitStoreHouse = value =>{
        setIsLoading(2)
        valueChange(value,"codeName",codeType,setIsLoading)
        setProhibited(false)
    }


    // 选择分支
    const changeBranch = value => {
        setIsLoading(2)
        valueChange(value,"codeBranch",codeType,setIsLoading)
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
            <FindAuth
                type={codeType}
            />
            <div className="guiView-inputs">
                <Form.Item
                    label="仓库"
                    name={"codeName"}
                    rules={[{required:true, message:"请选择仓库"}]}
                >
                    <Select
                        onChange={(value)=>changeGitStoreHouse(value)}
                        onFocus={()=>onFocus("codeName")}
                        onBlur={onBlur}
                        placeholder="仓库"
                    >
                        {
                            storehouseList && storehouseList.map(item=>{
                                return <Option key={item} value={item}> {item} </Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div className="guiView-inputs-suffix">
                    {fieldName === "codeName" &&
                        <SuffixStatus isLoading={isLoading}/>
                    }
                </div>
            </div>
            <div className="guiView-inputs">
                <Form.Item
                    label="分支"
                    name={"codeBranch"}
                >
                    <Select
                        disabled={prohibited}
                        placeholder="分支"
                        onFocus={()=>onFocus("codeName")}
                        onBlur={onBlur}
                        onChange={(value)=>changeBranch(value)}
                    >
                        {
                            branchList && branchList.map(item=>{
                                return  <Option key={item} value={item}> {item} </Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <div className="guiView-inputs-suffix">
                    {
                        fieldName === "codeBranch" &&
                        <SuffixStatus isLoading={isLoading}/>
                    }
                </div>
            </div>
        </>
    )
}

export default observer(CodeGiteeOrGithub)
