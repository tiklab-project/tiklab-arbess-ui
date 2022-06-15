import React, {useEffect} from "react";
import {Form, Input, Modal, Select} from "antd";

const {Option} = Select

const UpdateProof = props =>{
    const {visible,setVisible,formValue,updateProof,setFresh,fresh} = props
    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            form.setFieldsValue(formValue)
        }
    },[formValue])

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofId:formValue.proofId,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe,
                type:values.type,
            }
            updateProof(params).then(()=>{
                setFresh(!fresh)
            }).catch(error=>{
                console.log(error)
            })
            setVisible(false)
        })
    }
    return(
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
            >
                <Form.Item
                    label='凭证作用域'
                    name='type'
                    rules={[{required:true, message:'请选择凭证'}]}
                >
                    <Select >
                        <Option value={1}>全局凭证</Option>
                        <Option value={2}>项目凭证</Option>
                    </Select>
                </Form.Item>
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
            </Form>
        </Modal>
    )
}

export default UpdateProof