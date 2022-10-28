import React,{useState,useEffect,useContext} from "react";
import {Button,Form,message,Row,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import CodeGiteeOrGithubModal from "./codeGiteeOrGithubModal";
import authorizeStore from "../../store/authorizeStore";
import TestContext from "../common/testContext";
import ProofAll from "./proofAll";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {findCode,findState,updateProof,findAllStorehouse,storehouseList,findBranch,branchList} = authorizeStore

    const context = useContext(TestContext)

    const {formInitialValues,codeType,gitProofId} = context.configDataStore
    const {pipelineId} = context.pipelineStore
    const {updateConfigure} = context.configStore

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
        updateConfigure(params)
    }

    return(
        <>
            <Row>
                <ProofAll
                    {...props}
                    type={codeType}
                />
                <Button type="link" onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item
                label="仓库"
                name={"codeName"}
                rules={[{required:true, message:"请选择仓库"}]}
            >
                <Select
                    onChange={changeGitStoreHouse}
                    onClick={clickGitStoreHouse}
                    placeholder="请选择仓库"
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
                name={"codeBranch"}
            >
                <Select
                    disabled={prohibited}
                    placeholder="请选择分支"
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

export default observer(CodeGiteeOrGithub)
