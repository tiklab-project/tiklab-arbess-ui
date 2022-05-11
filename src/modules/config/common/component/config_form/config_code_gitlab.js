import React, {useState,Fragment} from 'react'
import {Button, Form, Input, Select,Row} from "antd";
import Config_code_gitModal from "./config_code_gitModal";
import {inject, observer} from "mobx-react";
import {FindAllProof} from "../../api/proof";

const {Option} = Select

const Config_code_Gitlab = props =>{

    const {ProofStore}=props
    const {createProof,findAllProof,findOneGitProof,allGitProofList} = ProofStore

    const [visible,setVisible]=useState(false)

    const clickFindAllGit = () =>{
        findAllProof(1)
    }

    const changeGitSelect = value =>{
        findOneGitProof(value)
    }

    return(
        <Fragment>
            <Form.Item
                name='gitlabCodeName'
                label="gitlab地址"
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
                name="gitlabBranch"
                label="分支"
            >
                <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Row>
                <Form.Item
                    name='gitlabProofName'
                    label='凭证'
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
                                    <Option key={item.proofId} value={item.proofName+ " (" + item.proofUsername + ")"}>
                                        { item.proofName+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                &nbsp; &nbsp;
                <Button
                    className='config-details-link'
                    onClick={()=> setVisible(true)}
                >
                    添加
                </Button>
            </Row>

            <Config_code_gitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('ProofStore')(observer(Config_code_Gitlab))
