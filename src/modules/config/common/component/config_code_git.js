import React, {Fragment,useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import Config_code_gitModal from "./config_code_gitModal";

const {Option} = Select

const Config_code_git = props =>{

    const {createProof,findAllGitProof,allGitProofList} = props

    const [visible,setVisible]=useState(false)

    const clickFindAllGit = () =>{
        findAllGitProof()
    }

    const changeGitSelect = value =>{
        localStorage.setItem('gitProofId',value)
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
                    onClick={()=> setVisible(true)}
                    className='config-details-link'
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

export default Config_code_git