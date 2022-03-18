import React, {useState,Fragment} from 'react'
import {Button, Form, Input,  Select} from "antd";
import SourceCode_GitModal from "../../../config/components/sourceCode_GitModal";
import {inject,observer} from "mobx-react";

const {Option} =Select

const ConfigDetailsSourceCode_Git = props =>{

    const {ProofStore}=props
    const {oneGitProof, createProof,findAllGitProof,findOneGitProof,allGitProofList} = ProofStore

    const [visible,setVisible]=useState(false)

    const clickFindAllGit=()=>{
        findAllGitProof()
    }

    const changeGitSelect = value =>{
        findOneGitProof(value)
        localStorage.setItem('gitProofId',value)
    }

    return(
        <Fragment>
            <Form.Item
                label="git地址"
                name='configureCodeSourceAddress'
                rules={[
                    {
                        pattern:/^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name="configureBranch" label="分支" defaultValue='master'>
                <Input placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Form.Item >
                <Select
                    placeholder="无"
                    style={{ width: 300 }}
                    onChange={changeGitSelect}
                    onClick={clickFindAllGit}
                    defaultValue=  { oneGitProof.proofName+ "(" + oneGitProof.proofUsername + ")"}
                >
                    {
                        allGitProofList && allGitProofList.map(item=>(
                            <Option key={item.proofId} value={item.proofId}>
                                { item.proofName+ "(" + item.proofUsername + ")"}
                            </Option>
                        ))
                    }
                </Select>
                &nbsp;
                <Button onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Form.Item>

            <SourceCode_GitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('ProofStore')(observer(ConfigDetailsSourceCode_Git))
