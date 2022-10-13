import React,{Fragment,useState,useEffect} from "react";
import {Button,Form,message,Row,Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FindAllProof from "./findAllProof";
import githubStore from "../../store/githubStore";
import giteeStore from "../../store/giteeStore";
import ConfigCodeGiteeOrGithubModal from "./configCodeGiteeOrGithubModal";
import {observer} from "mobx-react";

const {Option} =Select

const ConfigCodeGiteeOrGithub = props =>{

    const {configDataStore} = props

    const {getCode,getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url,getAllGiteeStorehouse,getGiteeBranch,getGiteeProof,getState} = giteeStore
    const {formInitialValues,codeType,setGitProofId} = configDataStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [storehouseList,setStorehouseList] = useState([]) // 仓库
    const [branchList,setBranchList] = useState([]) // 分支
    const gitProofId = localStorage.getItem("gitProofId")

    useEffect(()=>{
        if(codeType && formInitialValues[codeType+"codeName"]){
            setProhibited(false)
        }
    },[])

    let interval = null
    useEffect(()=>{
        const params = {
            code:null,
            state:0,
        }
        if(visible){
            interval = setInterval(()=>{
                getState(params).then(res=>{
                    console.log("getState",res)
                    if(res.data===1){
                        message.success({content:"授权成功", className:"message"})
                    }else if(res.data===2){
                        message.error({content:"拒绝授权或者授权失败", className:"message"})
                    }
                })
            },2000)
        }else { clearInterval(interval) }
        return ()=> clearInterval(interval)
    },[visible])

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        if(codeType===2){
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
            proofId:localStorage.getItem("gitProofId")
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
                <FindAllProof
                    {...props}
                    type={codeType}
                    configDataStore={configDataStore}
                />
                <Button className="config-details-link" type="link" onClick={()=> setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item  name={codeType+"codeName"} label="仓库" rules={[{required:true, message:"请选择仓库"}]}>
                <Select
                    style={{ width: 300 }}
                    onChange={changeGitStoreHouse}
                    onClick={clickGitStoreHouse}
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return  <Option key={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item  name={codeType+"codeBranch"}  label="分支" >
                <Select style={{ width: 300 }} disabled={prohibited}>
                    {
                        branchList && branchList.map(item=>{
                            return <Option key={item}> {item} </Option>
                        })
                    }
                </Select>
            </Form.Item>

            <ConfigCodeGiteeOrGithubModal
                visible={visible}
                setVisible={setVisible}
                formInitialValues={formInitialValues}
                codeType={codeType}
                url={url}
                getCode={getCode}
                getGithubProof={getGithubProof}
                getGiteeProof={getGiteeProof}
                setGitProofId={setGitProofId}
            />
        </Fragment>
    )
}

export default observer(ConfigCodeGiteeOrGithub)
