import React ,{useState} from "react";
import {Form, Input, Select, Button} from "antd";
import DeployAddModal from "./deployAddModal";

const Deploy = props =>{

    const {createProof,selectAllProof,selectProofName,allProof}=props

    const [visible,setVisible]=useState(false)

    const onCreate  = values =>{
        let params = {
            proofScope:2,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofPort:values.proofPort,
            proofDescribe:values.proofDescribe,
        }
        createProof(params)
        setVisible(false)
    }

    const onClick = () =>{
        selectAllProof()
    }
    const onChange=(value)=>{

    }

    return(
        <div className=' anchor-content'>
            <h1>部署</h1>
            <Form.Item name={'configureTargetAddress'} label='需要发送的文件地址'>
                <Input/>
            </Form.Item>
            <Form.Item name={'configureDeployIp'} label='IP地址'>
                <Input/>
            </Form.Item>
            <Form.Item name={'configureDeployAddress'} label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Select
                    placeholder="无"
                    style={{ width: 300 }}
                    onChange={onChange}
                    onClick={onClick}
                >
                    {
                        allProof.map(item=>{
                            return(
                                <Select.Option key={item.proofId}>
                                    {item.proofName}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
                &nbsp;
                <Button onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Form.Item>
            <DeployAddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={()=>setVisible(false)}
                okText="确认"
                cancelText="取消"
            />
        </div>
    )
}

export default Deploy