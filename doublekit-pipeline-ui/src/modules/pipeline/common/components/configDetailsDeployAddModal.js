import React from "react";
import {Form, Input, Modal} from "antd";

const ConfigDetailsDeployAddModal=({visible, onCreate, onCancel,})=>{

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="userForm" >
                <Form.Item label={'凭证名称'} name={'proofName'}>
                    <Input placeholder='名称'/>
                </Form.Item>
                <Form.Item label={'Ip地址'} name={'proofIp'}>
                    <Input placeholder='Ip地址'/>
                </Form.Item>
                <Form.Item label='username' name={'username'}>
                    <Input placeholder='账号'/>
                </Form.Item>
                <Form.Item label={'password'} name={'password'}>
                    <Input.Password  placeholder='密码'/>
                </Form.Item>
                <Form.Item label='port' name={'port'}>
                    <Input  placeholder='端口号'/>
                </Form.Item>
                <Form.Item name='describe' label='描述'>
                    <Input.TextArea  placeholder='备注'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ConfigDetailsDeployAddModal