import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, message, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ConfigCodeGiteeOrGithubModal from "./configCodeGiteeOrGithubModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigCodeGiteeOrGithub = props =>{

    const {githubStore,proofStore,configStore,configDataStore,giteeStore} = props
    const {getCode, getGithubProof,getAllGithubStorehouse,getGithubBranch} = githubStore
    const {url, getAllGiteeStorehouse,getGiteeBranch, getGiteeProof} = giteeStore
    const {findAllProof} = proofStore
    const {testPass} = configStore
    const {setCodeName,setCodeBranch,codeData,formInitialValues,codeType} = configDataStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [allAuthorizeList,setAllAuthorizeList] = useState([]) // 服务授权
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

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        if(codeData.codeType===2){
            getAllGiteeStorehouse(localStorage.getItem('gitProofId')).then(res=>{
                setStorehouseList(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else {
            getAllGithubStorehouse(localStorage.getItem('gitProofId')).then(res=>{
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
        if(codeData.dataType === 2){
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
        setCodeName(values)
    }

    const inputCodeBranchValue = values =>{
        setCodeBranch(values)
    }

    const newCode = () => {
        setVisible(true)
    }

    const clickFindAllProof = () => {
        findAllProof(codeData && codeData.dataType || codeType  ).then(res=>{
            console.log('GiteeOrGithub凭证',res)
            setAllAuthorizeList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeProofSelect = (value,e) =>{
        localStorage.setItem('gitProofId',e.key)
    }

    const test = () =>{
        const params = {
            proofId:gitProofId,
            url:codeData.codeName
        }
        testPass(params).then(res=>{
            console.log('res',res.data)
            if(res.data === true){
                message.success({
                    content: '连接成功',
                    style: {
                        marginTop: '9vh',
                        marginLeft:'5vh'
                    }
                })
            }else {
                message.error({
                    content: '连接失败',
                    style: {
                        marginTop: '9vh',
                        marginLeft:'5vh'
                    }
                })
            }
        })
    }

    return(
        <Fragment>
            <Row>
                <Form.Item label='服务授权/证书' name='gitProofName' >
                    <Select
                        style={{ width: 300 }}
                        onChange={(value,e)=>changeProofSelect(value,e)}
                        onClick={clickFindAllProof}
                    >
                        {
                            allAuthorizeList && allAuthorizeList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofDescribe+" (" +item.proofUsername+")"}>
                                        { item.proofDescribe+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button className='config-details-link' type="link" onClick={()=>newCode()}>
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
                <Select
                    style={{ width: 300 }}
                    disabled={prohibited}
                    onChange={()=>inputCodeBranchValue()}
                >
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item}> {item} </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>测试连接</Button>
            </div>

            <ConfigCodeGiteeOrGithubModal
                findAllProof={findAllProof}
                visible={visible}
                setVisible={setVisible}
                formInitialValues={formInitialValues}
                codeType={codeType}
                codeData={codeData}
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

export default inject('githubStore','proofStore',
                    'configStore','configDataStore','giteeStore')
                (observer(ConfigCodeGiteeOrGithub))
