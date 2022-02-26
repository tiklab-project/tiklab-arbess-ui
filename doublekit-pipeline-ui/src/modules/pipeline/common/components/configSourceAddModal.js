import React from "react";
import {Form, Select,Input,Modal} from "antd";

const { Option } = Select;

const ConfigSourceAddModal=({visible,onCancel,onCreate})=>{

    const [form]=Form.useForm()
    const oK=()=>{
        form
            .validateFields()
            .then(values => {
                form.resetFields()
                onCreate(values);
            })
            .catch(info => {
                console.log('校验失败:', info);
            })
    }

    return (
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={oK}
        >
            <Form form={form} layout="vertical" name="userForm" initialValues={{'type': 'a','effect':'a'}} >
                <Form.Item label='凭证作用域' name={'effect'}>
                    <Select >
                        <Option value="a">全局凭证</Option>
                        <Option value="b">系统凭证</Option>
                    </Select>
                </Form.Item>
                <Form.Item label={'凭证名称'} name={'proofName'}>
                    <Input placeholder='名称'/>
                </Form.Item>
                <Form.Item label='凭证类型' name={'proofType'}>
                    <Select placeholder='选择类型'>
                        <Option value="SSH">SSH</Option>
                        <Option value="password">password</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.proofType !== currentValues.proofType}>
                    {({ getFieldValue })=>
                        getFieldValue('proofType') === 'password' ? (
                            <>
                                <Form.Item name='proofUsername' label='username'>
                                    <Input placeholder='账号'/>
                                </Form.Item>
                                <Form.Item name='proofPassword' label='password'>
                                    <Input placeholder='密码'/>
                                </Form.Item>
                            </>
                        ):null
                    }
                </Form.Item>
                <Form.Item name='proofDescribe' label='描述'>
                    <Input.TextArea  placeholder='备注'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ConfigSourceAddModal