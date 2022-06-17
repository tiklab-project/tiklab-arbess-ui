import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, message, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ConfigCodeGiteeOrGithubModal from "./configCodeGiteeOrGithubModal";
import FindAllProof from "../../../../proof/components/findAllProof";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigCodeGiteeOrGithub = props =>{

    const {githubStore,configDataStore,giteeStore} = props
    const {getCode,getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url,getAllGiteeStorehouse,getGiteeBranch, getGiteeProof,getState} = giteeStore
    const {codeData,formInitialValues,codeType} = configDataStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [storehouseList,setStorehouseList] = useState([]) // 仓库
    const [branchList,setBranchList] = useState([]) // 分支
    const githubToken = localStorage.getItem('githubToken')
    const giteeToken = JSON.parse(localStorage.getItem('giteeToken'))
    const gitProofId = localStorage.getItem('gitProofId')

    useEffect(()=>{
        if(codeData && codeData.codeName){
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
                    console.log('getState',res)
                    if(res.data === 1){
                        message.success({content:'授权成功', className:'message'})
                    }else if(res.data === 2){
                        message.error({content:'拒绝授权或者授权失败', className:'message'})
                    }
                })
            },2000)
        }else { clearInterval(interval) }
        return ()=> clearInterval(interval)
    },[visible])

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        if(codeType  === 2){
            getAllGiteeStorehouse(gitProofId).then(res=>{
                setStorehouseList(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else {
            getAllGithubStorehouse(gitProofId).then(res=>{
                setStorehouseList(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    //仓库地址
    const changeGitStoreHouse = values =>{
        const params ={
            projectName:values,
            proofId:localStorage.getItem('gitProofId')
        }
        if(codeType === 2){
            getGiteeBranch(params).then(res=>{
                setBranchList(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else {
            getGithubBranch(params).then(res=>{
                setBranchList(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }
        setProhibited(false)
    }

    return(
        <Fragment>
            <Row>
                <FindAllProof  type={codeType} {...props}/>
                <Button className='config-details-link' type="link" onClick={()=> setVisible(true)}>
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item name='codeName' label="仓库">
                <Select
                    style={{ width: 300 }}
                    onChange={changeGitStoreHouse}
                    onClick={clickGitStoreHouse}
                >
                    {
                        storehouseList && storehouseList.map(item=>{
                            return (
                                <Option key={item}> {item} </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name="codeBranch" label="分支">
                <Select style={{ width: 300 }} disabled={prohibited}>
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item}> {item} </Option>
                            )
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
                githubToken={githubToken}
                url={url}
                getGiteeProof={getGiteeProof}
                giteeToken={giteeToken}
            />
        </Fragment>
    )
}

export default inject('githubStore','configStore',
                'configDataStore','giteeStore')
                (observer(ConfigCodeGiteeOrGithub))
