import React from "react";
import {Modal, Form, Input, message, Select} from "antd";
const { Option } = Select;

const ConfigDeployAddProofModal = props =>{

    const {deployVisible,setDeployVisible,createProof} = props
    const [form] = Form.useForm()

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofScope:2,
                proofType:values.proofType,
                proofName:values.proofName,
                proofIp:values.proofIp,
                proofPort:values.proofPort,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe,
            }
            createProof(params).then(res=>{
                console.log('创建部署凭证',res)
                if(res.code!==0){
                    message.info('创建失败')
                }
            })
        })
        setDeployVisible(false)
    }

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value< 1) {
            return Promise.reject("最小1");
        } else if (value > 10000) {
            return Promise.reject("最大10000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
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
                <Form.Item label='凭证名称' name='proofName'>
                    <Input placeholder='名称'/>
                </Form.Item>
                <Form.Item
                    label='Ip地址'
                    name='proofIp'
                    rules={[
                        {
                            pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                            message:'请输入正确的Ip地址'
                        }                        
                    ]}
                >
                   <Input  placeholder='输入IpV4地址'/>
                </Form.Item>
                <Form.Item
                    label='端口号'
                    name='proofPort'
                    rules={[
                        {
                            validator: validate,
                        },
                    ]}
                >
                    <Input placeholder="输入端口号"/>
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
            </Form>
        </Modal>
    )
}

export default ConfigDeployAddProofModal