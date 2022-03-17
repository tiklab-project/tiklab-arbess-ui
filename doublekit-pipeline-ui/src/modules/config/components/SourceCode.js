import React, { useState} from 'react'
import {Button, Radio, Input, Form, Space} from "antd";
import SourceAddModal from "./sourceAddModal";
import { Select } from 'antd';

const { Option } = Select;

const SourceCode = props => {

    const {createProof,findAllGitProof,findOneGitProof,allGitProofList}=props

    const [radio,setRadio]=useState(1)
    const [visible,setVisible]=useState(false)
    const [GitOrGitee,setGitOrGitee] = useState()

    const handlerRadio = e =>{
        setRadio(e.target.value)
    }

    const AddGit = () =>{
        setVisible(true)
        setGitOrGitee("Git")
    }

    const AddGitee = () =>{
        setVisible(true)
        setGitOrGitee("Gitee")
    }

    const clickFindAllGit = () =>{
        findAllGitProof()
    }

    const changeGitSelect = value =>{
        findOneGitProof(value)
        localStorage.setItem('gitProofId',value)
    }

    const clickFindGiteeCode = () =>{
        // findAllGitProof()
    }

    const changeFindGiteeProof = value =>{
        // findOneCodeProof(value)
    }

    return(
        <div className='anchor-content'>
            <h1>源码管理</h1>
            <Form.Item className='newDeployment-radio' name='configureCodeSource'>
                <Radio.Group  onChange={handlerRadio} value={radio}>
                    <Space>
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >Git</Radio>
                        {/*
                         <Radio value={3}>Gitee</Radio>
                        {
                            radio === 3 ?
                                <div className={'newDeployment-hidden'}>
                                    <Form.Item
                                        name="configureCodeSourceAddress"
                                        label="SVN地址"
                                    >
                                        <Input  />
                                    </Form.Item>
                                    <Form.Item
                                        name="configureBranch"
                                        label="分支"
                                        defaultValue={'master'}
                                    >
                                        <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Select
                                            placeholder="无"
                                            style={{ width: 300 }}
                                            onClick={clickFindGiteeCode}
                                            onChange={changeFindGiteeProof}
                                        >

                                        </Select>
                                        &nbsp;
                                        <Button onClick={()=>AddGitee()}>
                                            添加
                                        </Button>
                                    </Form.Item>
                                </div>:null
                        }
                        */}
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                radio === 2 ?
                    <>
                        <Form.Item
                            name='configureCodeSourceAddress'
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
                            name="configureBranch"
                            label="分支"
                            defaultValue={'master'}
                        >
                            <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
                        </Form.Item>
                        <Form.Item>
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
                            &nbsp;
                            <Button onClick={()=>AddGit()}>
                                添加
                            </Button>
                        </Form.Item>
                    </>:null
            }
            <SourceAddModal
                visible={visible}
                GitOrGitee={GitOrGitee}
                setVisible={setVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default SourceCode