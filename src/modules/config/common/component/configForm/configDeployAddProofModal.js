import React from "react";
import {Modal, Form, Input, Select, Button} from "antd";
const { Option } = Select;

const ConfigDeployAddProofModal = props =>{

    const {deployVisible,setDeployVisible,createProof} = props
    const [form] = Form.useForm()

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofScope:31,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe,
            }
            createProof(params)
            setDeployVisible(false)
        })
    }

    return (
        <Modal
            visible={deployVisible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setDeployVisible(false)}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{proofType:"password"}}
            >
                <Form.Item
                    label='凭证名称'
                    name='proofName'
                    rules={[{required:true, message:'请输入凭证名称'}]}
                >
                    <Input placeholder='名称'/>
                </Form.Item>
                <Form.Item label='凭证类型' name='proofType' >
                    <Select placeholder='选择类型'>
                        <Option value="SSH">SSH</Option>
                        <Option value="password">password</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.proofType !== currentValues.proofType}>
                    {({ getFieldValue })=>
                        getFieldValue('proofType') === 'password' ? (
                            <>
                                <Form.Item label='username' name='proofUsername'>
                                    <Input placeholder='账号'/>
                                </Form.Item>
                                <Form.Item label='password' name='proofPassword'>
                                    <Input.Password  placeholder='密码'/>
                                </Form.Item>
                            </>
                            ):
                            <Form.Item name='proofPassword' label='私钥'>
                                <Input.TextArea  placeholder='私钥'/>
                            </Form.Item>
                    }
                </Form.Item>
                <Form.Item name='proofDescribe' label='描述'>
                    <Input.TextArea  placeholder='备注'/>
                </Form.Item>
                <Form.Item >
                    <Button htmlType='submit'>连接测试</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ConfigDeployAddProofModal