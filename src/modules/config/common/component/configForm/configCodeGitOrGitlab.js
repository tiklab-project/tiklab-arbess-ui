import React, {Fragment, useEffect, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import ConfigCodeGitOrGitlabModal from "./configCodeGitOrGitlabModal";
import {inject, observer} from "mobx-react";
import ConfigStore from "../../store/configStore";

const {Option} = Select

const ConfigCodeGitOrGitlab = props =>{

    const {ProofStore,ConfigDataStore,ConfigStore}=props
    const {createProof,findAllProof,findOneProof} = ProofStore
    const {setCodeName, setCodeBranch,codeData} = ConfigDataStore
    const {testPass} = ConfigStore

    const [allGitProofList,setAllGitProofList] = useState([])
    const [visible,setVisible] = useState(false)
    const [connection,setConnection] = useState('')
    const gitProofId = localStorage.getItem('gitProofId')

    const clickFindAllGit = () =>{
        if(codeData.desc === '通用Git'){
            findAllProof(1).then(res=>{
                console.log('git凭证',res)
                setAllGitProofList(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }else{
            findAllProof(4).then(res=>{
                console.log('git凭证',res)
                setAllGitProofList(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }

    }

    const changeGitSelect = value =>{
        console.log(value)
        // const param = {
        //     proofId:value
        // }
        // findOneProof(param)
        localStorage.setItem('gitProofId',value)
    }

    const inputCodeNameValue = e =>{
        setCodeName(e.target.value)
    }

    const inputCodeBranchValue = e =>{
        setCodeBranch(e.target.value)
    }
    
    const newProof = () => {
        setVisible(true)
    }

    const test = () =>{
        const params = {
            proofId:gitProofId,
            url:codeData.codeName
        }
        if(codeData.desc==='通用Git'){
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
            <Form.Item
                name='codeName'
                label="git地址"
                rules={[
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Form.Item
                name="codeBranch"
                label="分支"
            >
                <Input
                    style={{ width: 300 }}
                    placeholder="请输入分支，默认是master"
                    onChange={e=>inputCodeBranchValue(e)}
                />
            </Form.Item>
            <Row>
                <Form.Item
                    name='gitProofName'
                    label="凭证"
                >
                    <Select
                        style={{ width: 300 }}
                        onClick={clickFindAllGit}
                        onChange={changeGitSelect}
                    >
                        <Option>
                            无
                        </Option>
                        {
                            allGitProofList && allGitProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} >
                                        { item.proofName+ "(" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button
                    onClick={()=>newProof()}
                    className='config-details-link'
                >
                    添加
                </Button>
            </Row>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>测试连接</Button>
                {
                    connection === 'fail' ? <span>失败</span> : null
                }
                {
                    connection === 'success' ? <span>成功</span> : null
                }
            </div>

            <ConfigCodeGitOrGitlabModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
                codeData={codeData}
            />

        </Fragment>
    )
}

export default inject('ProofStore','ConfigDataStore','ConfigStore')(observer(ConfigCodeGitOrGitlab))
