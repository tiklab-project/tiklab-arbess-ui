import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select,message} from "antd";
import ConfigCodeGitOrGitlabModal from "./configCodeGitOrGitlabModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigCodeGitOrGitlab = props =>{

    const {proofStore,configDataStore,configStore}=props
    const {createProof,findAllProof} = proofStore
    const {codeName,setCodeName, setCodeBranch,codeData,codeType} = configDataStore
    const {testPass} = configStore

    const [allGitProofList,setAllGitProofList] = useState([])
    const [visible,setVisible] = useState(false)
    const gitProofId = localStorage.getItem('gitProofId')

    const clickFindAllGit = () =>{
        findAllProof(codeType).then(res=>{
            console.log('gitOrGitlab凭证',res)
            setAllGitProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGitSelect = (value,e) =>{
        localStorage.setItem('gitProofId',e.key)
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
        if(codeName){
            const params = {
                proofId:gitProofId,
                url:codeName
            }
            testPass(params).then(res=>{
                if(res.data === true){
                    message.success({
                        content: '连接成功',
                        className:'message',
                    })
                }else {
                    message.error({
                        content:'连接失败',
                        className:'message',
                    })
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
                        required:true,
                        message:'请输入git地址'
                    },
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Form.Item name="codeBranch" label="分支">
                <Input
                    style={{ width: 300 }}
                    placeholder="请输入分支，默认是master"
                    onChange={e=>inputCodeBranchValue(e)}
                />
            </Form.Item>
            <Row>
                <Form.Item name='gitProofName' label="凭证">
                    <Select
                        style={{ width: 300 }}
                        onClick={clickFindAllGit}
                        onChange={(value,e)=>changeGitSelect(value,e)}
                    >
                        {
                            allGitProofList && allGitProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofName+ "(" + item.proofUsername + ")"}>
                                        { item.proofName+ "(" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={()=>newProof()} className='config-details-link'>
                    添加
                </Button>
            </Row>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>测试连接</Button>
            </div>

            <ConfigCodeGitOrGitlabModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
                codeData={codeData}
                codeType={codeType}
            />

        </Fragment>
    )
}

export default inject('proofStore','configDataStore','configStore')(observer(ConfigCodeGitOrGitlab))
