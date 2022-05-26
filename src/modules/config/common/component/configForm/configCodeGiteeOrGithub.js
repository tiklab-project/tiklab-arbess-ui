import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, message, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ConfigCodeGiteeOrGithubModal from "./configCodeGiteeOrGithubModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigCodeGiteeOrGithub = props =>{

    const {GithubStore,ProofStore,ConfigStore,ConfigDataStore,GiteeStore} = props

    const {getCode, getGithubProof,getAllGithubStorehouse,getGithubBranch,
    } = GithubStore

    const {url, getAllGiteeStorehouse,getGiteeBranch, getGiteeProof
    } = GiteeStore

    const {findAllProof} = ProofStore
    const {testPass} = ConfigStore
    const {setCodeName,setCodeBranch,codeData,formInitialValues} = ConfigDataStore

    const [visible,setVisible] = useState(false)
    const [prohibited,setProhibited] = useState(true) // 分支选择器是否禁止
    const [allAuthorizeList,setAllAuthorizeList] = useState([]) // 服务授权
    const [storehouseList,setStorehouseList] = useState([]) // 仓库
    const [branchList,setBranchList] = useState([]) // 分支
    const [connection,setConnection] = useState('')
    const githubToken = localStorage.getItem('githubToken')
    const giteeToken = JSON.parse(localStorage.getItem('giteeToken'))
    const gitProofId = localStorage.getItem('gitProofId')

    useEffect(()=>{
        if(codeData.codeName){
            setProhibited(false)
        }
    },[])

    // 得到所有仓库
    const clickGitStoreHouse = () =>{
        if(codeData.desc==='Gitee'){
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
        if(codeData.desc === 'Gitee'){
            getGiteeBranch(params).then(res=>{
                setBranchList(res.data)
            }).catch(error=>{
                console.log(error)
            })
            console.log('Gitee')
        }else {
            getGithubBranch(params).then(res=>{
                setBranchList(res.data)
            }).catch(error=>{
                console.log(error)
            })
            console.log('getGithubBranch')
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
        if(codeData.desc === 'Gitee'){
            findAllProof(2).then(res=>{
                console.log('Gitee凭证',res)
                setAllAuthorizeList(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }else {
            findAllProof(3).then(res=>{
                console.log('Github凭证',res)
                setAllAuthorizeList(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const changeProofSelect = value =>{
        localStorage.setItem('gitProofId',value)
    }

    const test = () =>{
        const params = {
            proofId:gitProofId,
            url:codeData.codeName
        }
        if(codeData.desc==='Gitee'){
            testPass(params).then(res=>{
                console.log('res',res.data)
                if(res.data === false){
                    setConnection('fail')
                }else {
                    setConnection('success')
                }
            })
        }
    }

    return(
        <Fragment>
            <Row>
                <Form.Item label='服务授权/证书' name='gitProofName' >
                    <Select
                        style={{ width: 300 }}
                        onChange={changeProofSelect}
                        onClick={clickFindAllProof}
                    >
                        {
                            allAuthorizeList && allAuthorizeList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofId} >
                                        { item.proofDescribe+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button
                    className='config-details-link'
                    type="link"
                    onClick={()=>newCode()}
                >
                    <PlusOutlined />
                    新增服务链接
                </Button>
            </Row>
            <Form.Item
                name='codeName'
                label="仓库"
            >
                <Select
                    style={{ width: 300 }}
                    onChange={changeGitStoreHouse}
                    onClick={clickGitStoreHouse}
                >
                    <Option >
                        无
                    </Option>
                    {
                        storehouseList && storehouseList.map(item=>{
                            return (
                                <Option key={item}>
                                    {item}
                                </Option>
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
                    <Option >
                        无
                    </Option>
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>测试连接</Button>
                {
                    connection === 'fail' ? <span>失败</span> : null
                }
                {
                    connection === 'success' ? <span>成功</span> : null
                }
            </div>

            <ConfigCodeGiteeOrGithubModal
                findAllProof={findAllProof}
                visible={visible}
                setVisible={setVisible}
                formInitialValues={formInitialValues}
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

export default inject('GithubStore','ProofStore',
                    'ConfigStore','ConfigDataStore','GiteeStore')
                (observer(ConfigCodeGiteeOrGithub))
