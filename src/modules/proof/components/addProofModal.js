import React from "react";
import {Modal, Form, Input, Select} from "antd";
import moment from "../../../common/moment/moment";
const { Option } = Select;

const AddProofModal = props =>{

    const {visible,setVisible,createProof,proofScope,userId,fresh,setFresh} = props
    const [form] = Form.useForm()

    const onOk = () =>{
        form.validateFields().then((values) => {
            let id;
            console.log(values.type)
            if(values.type===1){
                id=null
            }else {
                id=localStorage.getItem('pipelineId')
            }
            const params = {
                pipeline:{ pipelineId:id },
                user:{id:userId},
                type:values.type,
                proofScope:proofScope,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe,
                proofCreateTime:moment.moment,
            }
            createProof(params).then(()=>{
                setFresh(!fresh)
            }).catch(error=>{
                console.log(error)
            })
            setVisible(false)
        })
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
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{proofType:"password",type:1}}
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

export default AddProofModal