import React,{useState} from "react";
import {Button, Form, Input, Select} from "antd";
import ConfigDetailsDeployAddModal from "./configDetailsDeployAddModal";

const ConfigDetailsDeploy = props =>{

    const {createProof}=props

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

    const onChange = () =>{}

    const onClick = () =>{}

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
            <Form.Item >
                <Select
                    placeholder="无"
                    style={{ width: 300 }}
                    onChange={onChange}
                    onClick={onClick}
                >

                </Select>
                &nbsp;
                <Button onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Form.Item>
            <ConfigDetailsDeployAddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={()=>setVisible(false)}
                okText="确认"
                cancelText="取消"
            />
        </div>
    )
}

export default ConfigDetailsDeploy