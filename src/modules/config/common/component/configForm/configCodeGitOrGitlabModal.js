import React from "react";
import {Form, Select, Input, Modal, message} from "antd";

const { Option } = Select;

const ConfigCodeGitOrGitlabModal= props =>{

    const {visible,setVisible ,createProof,codeData} = props

    const [form] = Form.useForm();

    const onOk = () =>{
        form.validateFields().then((values) => {
            let params
            if(codeData.desc === '通用Git' ){
                params = {
                    proofScope:1,
                    proofType:values.proofType,
                    proofName:values.proofName,
                    proofUsername:values.proofUsername,
                    proofPassword:values.proofPassword,
                    proofDescribe:values.proofDescribe
                }
            }else {
                params = {
                    proofScope:4,
                    proofType:values.proofType,
                    proofName:values.proofName,
                    proofUsername:values.proofUsername,
                    proofPassword:values.proofPassword,
                    proofDescribe:values.proofDescribe
                }
                createProof(params).then(res=>{
                    console.log('创建源码凭证',res)
                    if(res.code!==0){
                        message.info('创建失败')
                    }
                })
            }
            createProof(params).then(res=>{
                console.log('创建源码凭证',res)
                if(res.code!==0){
                    message.info('创建失败')
                }
            })
            setVisible(false)
        })
    }

    return (
       <Modal
           visible={visible}
           closable={false}
           form={form}
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
               initialValues={{proofType:"password"}}
           >
               <Form.Item label='凭证名称' name='proofName'>
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
                           <Form.Item name='proofUsername' label='username'>
                               <Input placeholder='账号'/>
                           </Form.Item>
                           <Form.Item name='proofPassword' label='password'>
                               <Input.Password placeholder='密码'/>
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

export default ConfigCodeGitOrGitlabModal
