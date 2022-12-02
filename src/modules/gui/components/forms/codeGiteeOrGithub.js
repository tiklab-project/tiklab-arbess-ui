import React,{useState,useEffect,useContext} from "react";
import {Form,Select} from "antd";
import {observer} from "mobx-react";
import authorizeStore from "../../store/authorizeStore";
import TestContext from "../common/testContext";
import FindAuth from "../auth/findAuth";
import EmptyText from "../../../common/emptyText/emptyText";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {dataItem} = props

    const {findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore

    const context = useContext(TestContext)

    const {formInitialValues} = context.configStore
    const valueChange = context.valueChange

    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [fieldName,setFieldName] = useState("")

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
    },[formInitialValues])

    // 选择仓库地址
    const changeGitStoreHouse = value =>{
        valueChange(value,"codeName",dataItem.type)
        setProhibited(false)
    }


    // 选择分支
    const changeBranch = value => {
        valueChange(value,"codeBranch",dataItem.type)
    }


    const onFocus = name => {
        switch (name) {
            case "codeName":
                const param = {
                    authId:formInitialValues && formInitialValues[dataItem.configId+"_authId"],
                    type:dataItem.type
                }
                findAllStorehouse(param)
                break
            default:
                const params ={
                    houseName:formInitialValues && formInitialValues[dataItem.configId+"_codeName"],
                    authId:formInitialValues && formInitialValues[dataItem.configId+"_authId"],
                    type:dataItem.type
                }
                findBranch(params)
        }
    }

    const onBlur = () => {
        setFieldName("")
    }

    return(
        <>
            <FindAuth dataItem={dataItem}/>
            <Form.Item
                label="仓库"
                name={dataItem.configId+"_codeName"}
                rules={[{required:true, message:"请选择仓库"}]}
            >
                <Select
                    showSearch
                    placeholder={fieldName === "codeName" ?"仓库":"未选择"}
                    onChange={(value)=>changeGitStoreHouse(value)}
                    onFocus={()=>onFocus("codeName")}
                    onBlur={onBlur}
                    notFoundContent={<EmptyText/>}
                    filterOption = {(input, option) =>
                        (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Option key={item} value={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="分支"
                name={dataItem.configId+"_codeBranch"}
            >
                <Select
                    disabled={prohibited}
                    placeholder={fieldName === "codeBranch" ?"分支":"未选择"}
                    onFocus={()=>onFocus("codeBranch")}
                    onBlur={onBlur}
                    onChange={(value)=>changeBranch(value)}
                    notFoundContent={<EmptyText/>}
                >
                    {
                        branchList && branchList.map(item=>{
                            return  <Option key={item} value={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>
        </>
    )
}

export default observer(CodeGiteeOrGithub)
