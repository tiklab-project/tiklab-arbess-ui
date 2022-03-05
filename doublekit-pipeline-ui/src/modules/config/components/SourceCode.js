import React,{useState} from 'react'
import {Button, Radio, Input, Form, Space} from "antd";
import SourceCodeAddModal from "./sourceCodeAddModal";
import { Select } from 'antd';

const { Option } = Select;

const SourceCode = props => {

    const {createProof,selectAllProof,selectProofName,allProof}=props

    const [value,setValue]=useState('a')
    const [visible,setVisible]=useState(false)

    const handlerRadio = e =>{
        setValue(e.target.value)
    }

    const onCreate=(values)=>{
        let params = {
            proofScope:1,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe
        }
        createProof(params)
        setVisible(false)
    }
    const onClick = () =>{
        selectAllProof()
    }
    const onChange=(value)=>{
        selectProofName(value)
        if(!value){
            localStorage.setItem('proofId',null)
        }else {
            localStorage.setItem('proofId',value)
        }
    }

    return(
        <div className='anchor-content'>
            <h1>源码管理</h1>
            <Form.Item className='newDeployment-radio' name={'configureCodeSource'}>
                    <Radio.Group  onChange={handlerRadio} value={value}>
                        <Space direction="vertical">
                            <Radio value='a'>无</Radio>
                            <Radio value='b' >git</Radio>
                            {
                                value==='b' ?
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
                                            name="master"
                                            label="分支"
                                            defaultValue={'master'}
                                        >
                                            <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Select
                                                placeholder="无"
                                                style={{ width: 300 }}
                                                onClick={onClick}
                                                onChange={onChange}
                                            >
                                                {
                                                    allProof.map(item=>{
                                                        return(
                                                            <Option key={item.proofId}>
                                                                {item.proofName}
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