import React from "react";
import {Form, Select,Input,Modal} from "antd";

const { Option } = Select;
const ModalSource =({visible,onCancel,onCreate})=>{
    const [form]=Form.useForm()
    const oK=()=>{
        form
            .validateFields()
            .then(values => {
                onCreate(values);
            })
            .catch(info => {
                console.log('校验失败:', info);
            })
    }
    return (
        <Modal
            closable={false}
            visible={visible}
            onCancel={onCancel}
            cancelText='取消'
            okText='确定'
            onOk={oK}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    effect:"a",
                    type:"a"
                }}
            >
                <Form.Item
                    name='effect'
                    label='凭证作用域'
                >
                    <Select >
                        <Option value="a">全局凭证</Option>
                        <Option value="b">系统凭证</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='type'
                    label='凭证类型'
                >
                    <Select  placeholder="SSH">
                        <Option value="a">SSH</Option>
                        <Option value="b">password</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='username'
                    label='username'
                >
                    <Input placeholder='用户名'/>
                </Form.Item>
                <Form.Item
                    name='password'
                    label='password'
                >
                    <Input placeholder='密码'/>
                </Form.Item>
                <Form.Item
                    name='info'
                    label='描述'
                >
                    <Input.TextArea  placeholder='备注'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSource