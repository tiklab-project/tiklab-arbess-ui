import React,{Fragment,useState,useEffect} from "react";
import {Button,Form,message,Row,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FindAllProof from "../../../../proof/components/findAllProof";
import ConfigCodeGiteeOrGithubModal from "./configCodeGiteeOrGithubModal";
import {inject,observer} from "mobx-react";

const {Option} =Select

const ConfigCodeGiteeOrGithub = props =>{

    const {githubStore,configDataStore,giteeStore} = props

    const {getCode,getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url,getAllGiteeStorehouse,getGiteeBranch,getGiteeProof,getState} = giteeStore
    const {codeData,formInitialValues,codeType,gitProofId} = configDataStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [storehouseList,setStorehouseList] = useState([]) // 仓库
    const [branchList,setBranchList] = useState([]) // 分支

    useEffect(()=>{
        if(codeData && codeData.codeName){
            setProhibited(false)
        }
    },[codeData])

    let interval = null
    useEffect(()=>{
        const params = {
            code:null,
            state:0,
        }
        if(visible){
            interval = setInterval(()=>getState(params).then(res=>warn(res.data)),2000)
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
        if(codeType  === 2){
            getAllGiteeStorehouse(gitProofId).then(res=>{
                if(res.code===0 && res.data){
                    setStorehouseList(res.data)
                }
            }).catch(error=>{
                console.log(error)
            })
        }else {
            getAllGithubStorehouse(gitProofId).then(res=>{
                if(res.code===0 && res.data){
                    setStorehouseList(res.data)
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    //仓库地址
    const changeGitStoreHouse = values =>{
        const params ={
            projectName:values,
            proofId:gitProofId
        }
        if(codeType === 2){
            getGiteeBranch(params).then(res=>{
                if(res.code===0 && res.data){
                    setBranchList(res.data)
                }
            }).catch(error=>{
                console.log(error)
            })
        }else {
            getGithubBranch(params).then(res=>{
                if(res.code===0 && res.data){
                    setBranchList(res.data)
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        setProhibited(false)
    }

    return(
        <Fragment>
            <Row>
                <FindAllProof type={codeType} {...props}/>
                <Button className="config-details-link" type="link" onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item label="仓库" name="codeName" rules={[{required:true, message:"请选择仓库"}]}>
                <Select style={{ width: 300 }} onChange={changeGitStoreHouse} onClick={clickGitStoreHouse}>
                    {
                        storehouseList && storehouseList.map(item=>{
                            return <Option key={item} value={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="分支" name="codeBranch" className="noRequired">
                <Select style={{ width: 300 }} disabled={prohibited}>
                    {
                        branchList && branchList.map(item=>{
                            return  <Option key={item} value={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>

            <ConfigCodeGiteeOrGithubModal
                visible={visible}
                setVisible={setVisible}
                formInitialValues={formInitialValues}
                codeType={codeType}
                getCode={getCode}
                getGithubProof={getGithubProof}
                url={url}
                getGiteeProof={getGiteeProof}
            />
        </Fragment>
    )
}

export default inject("githubStore","configStore","configDataStore","giteeStore")
                (observer(ConfigCodeGiteeOrGithub))
