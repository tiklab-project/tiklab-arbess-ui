import React from "react";
import {Modal,Form,Input,Select} from "antd";
import moment from "../../../../common/moment/moment";

const {Option} = Select;

const AddProofModal = props =>{

    const {visible,setVisible,createProof,userId,type,context} = props

    const [form] = Form.useForm()

    const onOk = values =>{
        let proofList;
        if(values.type===1){
            proofList = null
        }else {
            proofList = [`${context.pipelineId}`]
        }
        const params = {
            user:{id:userId},
            type:values.type,
            proofScope:type,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofCreateTime:moment.moment,
            proofList:proofList
        }
        createProof(params)
        setVisible(false)
    }

    return (
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
            bodyStyle={{maxHeight:700,"overflow":"auto"}}
        >
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{proofType:"password",type:1}}
            >
                <Form.Item label="凭证作用域" name="type">
                    <Select>
                        <Option value={1}>全局凭证</Option>
                        <Option value={2}>项目凭证</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="凭证名称"
                    name="proofName"
                    rules={[{required:true, message:"请输入凭证名称"}]}
                >
                    <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item label="凭证类型" name="proofType" >
                    <Select placeholder="选择类型">
                        <Option value="SSH">SSH</Option>
                        <Option value="password">password</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.proofType !== currentValues.proofType}>
                    {({ getFieldValue })=>
                        getFieldValue("proofType") === "password" ? (
                                <>
                                    <Form.Item label="username" name="proofUsername">
                                        <Input placeholder="账号"/>
                                    </Form.Item>
                                    <Form.Item label="password" name="proofPassword">
                                        <Input.Password  placeholder="密码"/>
                                    </Form.Item>
                                </>
                            ):
                            <Form.Item name="proofPassword" label="私钥">
                                <Input.TextArea  placeholder="私钥"/>
                            </Form.Item>
                    }
                </Form.Item>
                <Form.Item name="proofDescribe" label="描述">
                    <Input.TextArea  placeholder="备注"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddProofModal