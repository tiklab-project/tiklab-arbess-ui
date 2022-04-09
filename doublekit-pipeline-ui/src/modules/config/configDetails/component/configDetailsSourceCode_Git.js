import React, {useState,Fragment} from 'react'
import {Button, Form, Input, Select,Row} from "antd";
import SourceCode_GitModal from "../../common/component/sourceCode_GitModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigDetailsSourceCode_Git = props =>{

    const {ProofStore}=props
    const {createProof,findAllGitProof,findOneGitProof,allGitProofList} = ProofStore

    const [visible,setVisible]=useState(false)

    const clickFindAllGit = () =>{
        findAllGitProof()
    }

    const changeGitSelect = value =>{
        findOneGitProof(value)
    }

    return(
        <Fragment>
            <Form.Item
                name='gitCodeName'
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
                <Form.Item name='gitProofName'>
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
                                    <Option key={item.proofId} value={item.proofName+ " (" + item.proofUsername + ")"}>
                                        { item.proofName+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                &nbsp; &nbsp;
                <Button onClick={()=> setVisible(true)}>
                    添加
                </Button>
            </Row>

            <SourceCode_GitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('ProofStore')(observer(ConfigDetailsSourceCode_Git))