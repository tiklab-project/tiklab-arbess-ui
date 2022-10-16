import React,{useState,useEffect} from "react";
import {Button,Form,message,Row,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FindAllProof from "./findAllProof";
import {inject,observer} from "mobx-react";
import CodeGiteeOrGithubModal from "./codeGIteeOrGIthubModal";

const {Option} =Select

const CodeGiteeOrGithub = props =>{

    const {githubStore,configDataStore,giteeStore,configStore,pipelineStore} = props

    const {getCode,getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url,getAllGiteeStorehouse,getGiteeBranch,getGiteeProof,getState} = giteeStore
    const {formInitialValues,codeType,gitProofId,setGitProofId,setFormInitialValues} = configDataStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

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
            takType:codeType,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            message:"update"
        }
        setFormInitialValues({key:value})
        updateConfigure(params)
    }

    return(
        <>
            <Row>
                <FindAllProof type={codeType} {...props}/>
                <Button className="config-details-link" type="link" onClick={()=>setVisible(true)}>
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
                    bordered={false}
                    placeholder="请选择仓库"
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Option key={item} value={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="分支"  name={"codeBranch"}>
                <Select
                    disabled={prohibited}
                    bordered={false}
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

export default inject("githubStore","configDataStore","giteeStore","configStore","pipelineStore")
                (observer(CodeGiteeOrGithub))
