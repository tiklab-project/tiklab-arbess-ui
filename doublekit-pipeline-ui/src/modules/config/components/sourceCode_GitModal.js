import React  from "react";
import {Form, Select, Input, Modal} from "antd";

const { Option } = Select;

const SourceCode_GitModal= props =>{

    const [form] = Form.useForm();

    const {visible,setVisible ,createProof} = props

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofScope:1,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe
            }
            createProof(params)
        })
        setVisible(false)
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
           <Form form={form} layout="vertical" name="userForm" initialValues={{proofType:"password"}}>
               <Form.Item label={'凭证名称'} name={'proofName'}>
                   <Input placeholder='名称'/>
               </Form.Item>
               <Form.Item label='凭证类型' name={'proofType'} >
                   <Select placeholder='选择类型' >
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

export default SourceCode_GitModal