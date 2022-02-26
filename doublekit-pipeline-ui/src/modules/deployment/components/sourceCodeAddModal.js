import React, {useState} from "react";
import {Form, Select, Input, Modal} from "antd";

const { Option } = Select;

const SourceCodeAddModal=({visible, onCreate, onCancel,})=>{

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
               <Form.Item label='凭证作用域' name={'proofScope'}>
                   <Select placeholder='选择作用域'>
                       <Option value="1">全局凭证</Option>
                       <Option value="2">系统凭证</Option>
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
              <div style={{marginTop:-20}}>
                  <Form.Item name='proofDescribe' label='描述'>
                      <Input.TextArea  placeholder='备注'/>
                  </Form.Item>
              </div>
           </Form>
       </Modal>
    )
}
export default SourceCodeAddModal