import React, {useState} from 'react'
import {Button, Form, Input, Select,Row,Col} from "antd";
import SourceCode_GitModal from "../../common/sourceCode_GitModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const configDetailsSourceCode_Git = props =>{

    const {ProofStore,ConfigStore}=props
    const {createProof,findAllGitProof,findOneGitProof,allGitProofList} = ProofStore
    const { gitProofList } = ConfigStore

    const [visible,setVisible]=useState(false)

    const clickFindAllGit = () =>{
        findAllGitProof()
    }

    const changeGitSelect = value =>{
        findOneGitProof(value)
        localStorage.setItem('gitProofId',value)
    }

    return(
        <>
            <Form.Item
                name='gitAddress'
                label="git地址"
                rules={[
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                name="gitBranch"
                label="分支"
            >
                <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Row>
                <Form.Item name='gitOpt'>
                    <Select
                        placeholder="无"
                        style={{ width: 300 }}
                        onClick={clickFindAllGit}
                        onChange={changeGitSelect}
                    >
                        {
                            allGitProofList && allGitProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofId}>
                                        { item.proofName+ "(" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={()=> setVisible(true)}>
                    添加
                </Button>
            </Row>

            <SourceCode_GitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </>
    )
}

export default inject('ProofStore','ConfigStore')(observer(configDetailsSourceCode_Git))