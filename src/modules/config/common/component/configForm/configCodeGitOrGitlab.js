import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select,message} from "antd";
import ConfigCodeGitOrGitlabModal from "./configCodeGitOrGitlabModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigCodeGitOrGitlab = props =>{

    const {proofStore,configDataStore,configStore}=props
    const {createProof,findAllProof} = proofStore
    const {setCodeName, setCodeBranch,codeData} = configDataStore
    const {testPass} = configStore

    const [allGitProofList,setAllGitProofList] = useState([])
    const [visible,setVisible] = useState(false)
    const [connection,setConnection] = useState('')
    const gitProofId = localStorage.getItem('gitProofId')

    const clickFindAllGit = () =>{
        findAllProof(codeData.codeType).then(res=>{
            console.log('gitOrGitlab凭证',res)
            setAllGitProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGitSelect = value =>{
        console.log(value)
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
        testPass(params).then(res=>{
            console.log('res',res.data)
            if(res.data === true){
                message.success('连接成功')
                setConnection('success')
            }else {
                message.info('连接失败')
                setConnection('fail')
            }
        })
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
                <Button onClick={()=>newProof()} className='config-details-link'>
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

export default inject('proofStore','configDataStore','configStore')(observer(ConfigCodeGitOrGitlab))
