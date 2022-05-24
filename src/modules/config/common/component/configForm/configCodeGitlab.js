import React, {useState,Fragment} from 'react'
import {Button, Form, Input, Select,Row} from "antd";
import ConfigCodeGitModal from "./configCodeGitModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigCodeGitlab = props =>{

    const {ProofStore}=props
    const {createProof,findAllProof,findOneProof} = ProofStore

    const [allGitProofList,setAllGitProofList] = useState([])
    const [visible,setVisible]=useState(false)

    const clickFindAllGitlab = () =>{
        const param = {
            type :1
        }
        findAllProof(param).then(res=>{
            console.log('git凭证',res)
            setAllGitProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGitlabSelect = value =>{
        const param = {
            proofId:value
        }
        findOneProof(param)
    }

    return(
        <Fragment>
            <Form.Item
                name='codeName'
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
                name="codeBranch"
                label="分支"
            >
                <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Row>
                <Form.Item
                    name='proofName'
                    label='凭证'
                >
                    <Select
                        style={{ width: 300 }}
                        onClick={clickFindAllGitlab}
                        onChange={changeGitlabSelect}
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

            <ConfigCodeGitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('ProofStore')(observer(ConfigCodeGitlab))
