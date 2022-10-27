import React,{useState,useEffect} from "react";
import {Button,Form,message,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FindAllProof from "./findAllProof";
import {inject,observer} from "mobx-react";
import CodeGiteeOrGithubModal from "./codeGIteeOrGIthubModal";
import "./inputs.scss";
import SuffixStatus from "./suffixStatus";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {configDataStore,configStore,pipelineStore,authorizeStore} = props

    const {findCode,findState,updateProof,findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore
    const {formInitialValues,codeType,gitProofId} = configDataStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [isFindState,setIsFindState] = useState(false)
    const [fieldName,setFieldName] = useState("")
    const [isLoading,setIsLoading] = useState(1)

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
    },[formInitialValues])

    // 授权过程--失败或成功提示
    let interval = null
    useEffect(()=>{
        if(visible){
            interval = setInterval(()=>findState().then(res=>warn(res.data)),1000)
        }else clearInterval(interval)
        return ()=> clearInterval(interval)
    },[visible,isFindState])
    
    const warn = data => {
        if(data === 1){
            clearInterval(interval)
            message.success({content:"授权成功", className:"message"})
        }else if(data === 2){
            message.error({content:"拒绝授权或授权失败", className:"message"})
            clearInterval(interval)
        }
    }

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        const params = {
            proofId:gitProofId,
            type:codeType
        }
        findAllStorehouse(params)
    }

    // 获取所有分支
    const clickBranch = () => {
        const params ={
            houseName:formInitialValues && formInitialValues.codeName,
            proofId:gitProofId,
            type:codeType
        }
        findBranch(params)
        setIsLoading(2)
    }

    // 选择仓库地址
    const changeGitStoreHouse = value =>{
        change("codeName",value)
        setProhibited(false)
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
        formInitialValues.key=value
        updateConfigure(params).then(res=>{
            res.code===0 && setIsLoading(3)
        })
        setTimeout(()=>setIsLoading(1),1000)
    }

    const onFocus = name => {
        setIsLoading(2)
        setFieldName(name)
    }

    const onBlur = () => {
        setIsLoading(1)
        setFieldName("")
    }

    const style={
        display:"flex",
    }

    return(
        <>
            <div style={style}>
                <FindAllProof type={codeType} {...props}/>
                <Button className="config-details-link" type="link" onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </div>
            <div className="formView-inputs">
                <Form.Item
                    label="仓库"
                    name={"codeName"}
                    rules={[{required:true, message:"请选择仓库"}]}
                >
                    <Select
                        onChange={changeGitStoreHouse}
                        onClick={clickGitStoreHouse}
                        onFocus={()=>onFocus("codeName")}
                        onBlur={onBlur}
                        bordered={fieldName === "codeName"}
                        placeholder="请选择仓库"
                    >
                        {
                            storehouseList && storehouseList.map(item=>{
                                return <Option key={item} value={item}> {item} </Option>
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
                        placeholder="请选择分支"
                        onFocus={()=>onFocus("codeBranch")}
                        onBlur={onBlur}
                        onClick={clickBranch}
                        onChange={changeBranch}
                    >
                        {
                            branchList && branchList.map(item=>{
                                return  <Option key={item} value={item}> {item} </Option>
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

            <CodeGiteeOrGithubModal
                visible={visible}
                setVisible={setVisible}
                formInitialValues={formInitialValues}
                codeType={codeType}
                findCode={findCode}
                setIsFindState={setIsFindState}
                isFindState={isFindState}
                updateProof={updateProof}
            />
        </>
    )
}

export default inject("configDataStore","configStore","pipelineStore","authorizeStore")
                (observer(CodeGiteeOrGithub))
