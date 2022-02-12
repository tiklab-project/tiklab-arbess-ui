import React from "react";
import {Form, Select, Input, Modal} from "antd";

const { Option } = Select;

const SourceCodeAddModal=({visible, onCreate, onCancel,})=>{
    const [form] = Form.useForm();
    return (
       <Modal
           visible={visible}
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
           <Form form={form} layout="vertical" name="userForm">
               <Form.Item label='凭证作用域'>
                   <Select defaultValue='a'>
                       <Option value="a">全局凭证</Option>
                       <Option value="b">系统凭证</Option>
                   </Select>
               </Form.Item>
               <Form.Item label='凭证类型'>
                   <Select defaultValue='a' placeholder="SSH">
                       <Option value="a">SSH</Option>
                       <Option value="b">password</Option>
                   </Select>
               </Form.Item>
               <Form.Item name='username' label='username'>
                   <Input placeholder='用户名'/>
               </Form.Item>
               <Form.Item name='password' label='password'>
                   <Input placeholder='密码'/>
               </Form.Item>
               <Form.Item name='info' label='描述'>
                   <Input.TextArea  placeholder='备注'/>
               </Form.Item>
           </Form>
       </Modal>
    )
}
export default SourceCodeAddModal