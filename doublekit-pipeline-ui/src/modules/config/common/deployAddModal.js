import React from "react";
import {Form, Input, Modal} from "antd";

const DeployAddModal= props =>{

    const {visible,setVisible,createProof} = props
    const [form] = Form.useForm();

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofScope:2,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofPort:values.proofPort,
                proofDescribe:values.proofDescribe,
            }
            createProof(params)
        })
        setVisible(false)
    }

    return (
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={onOk}
        >
            <Form form={form} layout="vertical" name="userForm" >
                <Form.Item label={'凭证名称'} name={'proofName'}>
                    <Input placeholder='名称'/>
                </Form.Item>
                <Form.Item label='username' name={'proofUsername'}>
                    <Input placeholder='账号'/>
                </Form.Item>
                <Form.Item label={'password'} name={'proofPassword'}>
                    <Input.Password  placeholder='密码'/>
                </Form.Item>
                <Form.Item label='port' name={'proofPort'}>
                   <Input  placeholder='端口号'/>
                </Form.Item>
                <Form.Item name='proofDescribe' label='描述'>
                    <Input.TextArea  placeholder='备注'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DeployAddModal