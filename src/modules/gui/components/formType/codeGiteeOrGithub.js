import React,{useState,useEffect,useContext} from "react";
import {Button,Form,message,Row,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import CodeGiteeOrGithubModal from "./codeGiteeOrGithubModal";
import githubStore from "../../store/githubStore";
import giteeStore from "../../store/giteeStore";
import ConfigStore from "../../store/ConfigStore";
import TestContext from "../common/testContext";
import ProofAll from "./proofAll";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {getCode,getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url,getAllGiteeStorehouse,getGiteeBranch,getGiteeProof,getState} = giteeStore
    const {updateConfigure} = ConfigStore

    const context = useContext(TestContext)

    const {formInitialValues,codeType,gitProofId,setGitProofId,setFormInitialValues} = context.configDataStore
    const pipelineId = context.pipelineId

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [storehouseList,setStorehouseList] = useState([]) // 仓库
    const [branchList,setBranchList] = useState([]) // 分支
    const [gitStoreHouse,setGitStoreHouse] = useState("")

    useEffect(()=>{
        if(formInitialValues && formInitialValues.codeName){
            setProhibited(false)
        }
    },[formInitialValues])

    // 授权过程--失败或成功提示
    let interval = null
    useEffect(()=>{
        const params = {
            code:null,
            state:0,
        }
        if(visible){
            interval = setInterval(()=>getState(params).then(res=>warn(res.data)),1000)
        }else clearInterval(interval)
        return ()=> clearInterval(interval)
    },[visible])
    
    const warn = data => {
        if(data === 1){
            message.success({content:"授权成功", className:"message"})
        }else if(data === 2){
            message.error({content:"拒绝授权或授权失败", className:"message"})
        }
    }

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        if(codeType === 2){
            getAllGiteeStorehouse(gitProofId).then(res=>{
                getStorehouseList(res)
            })
        }else {
            getAllGithubStorehouse(gitProofId).then(res=>{
                getStorehouseList(res)
            })
        }
    }

    const getStorehouseList = data => {
        if(data.code===0 && data.data){
            setStorehouseList(data.data)
        }
    }

    // 获取所有分支
    const clickBranch = () => {
        const params ={
            projectName:gitStoreHouse,
            proofId:gitProofId
        }
        if(codeType === 2){
            getGiteeBranch(params).then(res=>{
                getBranchList(res)
            })
        }else {
            getGithubBranch(params).then(res=>{
                getBranchList(res)
            })
        }
    }

    const getBranchList = data =>{
        if(data.code===0 && data.data){
            setBranchList(data.data)
        }
    }

    // 选择仓库地址
    const changeGitStoreHouse = value =>{
        setGitStoreHouse(value)
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
            pipelineId,
            type:codeType,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            messgae:"update"
        }
        setFormInitialValues({key:value})
        updateConfigure(params)
    }

    return(
        <>
            <Row>
                <ProofAll
                    {...props}
                    type={codeType}
                />
                <Button className="config-details-link" type="link" onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item
                label="仓库"
                name={"codeName"}
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
                getCode={getCode}
                getGithubProof={getGithubProof}
                url={url}
                getGiteeProof={getGiteeProof}
                setGitProofId={setGitProofId}
            />
        </>
    )
}

export default observer(CodeGiteeOrGithub)
