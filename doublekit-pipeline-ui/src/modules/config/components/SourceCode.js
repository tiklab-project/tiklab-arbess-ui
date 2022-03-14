import React, {Fragment, useState} from 'react'
import {Button, Radio, Input, Form, Space} from "antd";
import SourceCodeAddModal from "./sourceCodeAddModal";
import { Select } from 'antd';

const { Option } = Select;

const SourceCode = props => {

    const {createGitProof,findAllGitProof,findOneCodeProof,allGitProof}=props

    const [radio,setRadio]=useState(1)
    const [visible,setVisible]=useState(false)

    const handlerRadio = e =>{
        setRadio(e.target.value)
    }

    const onCreate= values =>{
        let params = {
            proofScope:1,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe
        }
        createGitProof(params)
        setVisible(false)
    }

    const findAllCode = () =>{
        findAllGitProof()
    }

    const codeSelect = value =>{
        findOneCodeProof(value)
        localStorage.setItem('gitProofId',value)
    }

    return(
        <div className='anchor-content'>
            <h1>源码管理</h1>
            <Form.Item className='newDeployment-radio' name={'configureCodeSource'}>
                <Radio.Group  onChange={handlerRadio} value={radio}>
                    <Space direction="vertical">
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >git</Radio>
                        {
                            radio === 2 ?
                                <div className={'newDeployment-hidden'}>
                                    <Form.Item
                                        name="configureCodeSourceAddress"
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
                                            onClick={findAllCode}
                                            onChange={codeSelect}
                                        >
                                            {
                                                allGitProof.map(item=>{
                                                    return(
                                                        <Option key={item.proofId} value={item.proofId}>
                                                            { item.proofName+ "(" + item.proofUsername + ")"}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                        &nbsp;
                                        <Button onClick={()=>setVisible(true)}>
                                            添加
                                        </Button>
                                    </Form.Item>
                                </div>:null
                        }
                    </Space>
                </Radio.Group>
            </Form.Item>

            <SourceCodeAddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={()=>setVisible(false)}
                okText="确认"
                cancelText="取消"
            />
        </div>
    )
}

export default SourceCode