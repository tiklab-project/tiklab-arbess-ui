import React,{useEffect,useState} from "react";
import {Modal,Form,Select,Input} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const IdentifyModal = props =>{

    const {visible,setVisible,formValue,createAuth,updateAuth} = props

    const [form] = Form.useForm()
    const [authType,setAuthType] = useState(0)

    useEffect(()=>{
        if(visible){
            if(formValue){
                form.setFieldsValue(formValue)
                setAuthType(formValue.authType)
            }else {
                form.resetFields()
                setAuthType(0)
            }
        }
    },[visible])

    const onOk = value =>{
        if(formValue){
            const params = {
                authId:formValue.authId,
                name:value.name,
                type:value.type,
                authType:value.authType,
                username:value.username,
                password:value.password,
                url:value.url,
                token:value.token,
            }
            updateAuth(params)
        }else {
            createAuth(value)
        }
        setVisible(false)
    }

    
    const onchange = value => {
        setAuthType(value)
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            okText="确认"
            cancelText="取消"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
        >
            <ModalTitle
                setVisible={setVisible}
                title={formValue===""? "添加":"修改"}
            />
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{type:1,authType:0}}
            >
                <Form.Item name="name" label="名称"
                           rules={[{required:true,message:`请输入名称`}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="服务器地址" name="url"
                           rules={[{required:true,message:"请输入服务器地址"}]}

                >
                    <Input/>
                </Form.Item>
                <Form.Item name="type" label="认证类型">
                    <Select>
                        <Select.Option value={1}>代码扫描</Select.Option>
                        <Select.Option value={2}>推送制品</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="授权类型" name="authType">
                    <Select onChange={onchange}>
                        <Select.Option value={0}>无</Select.Option>
                        <Select.Option value={1}>username&password</Select.Option>
                        <Select.Option value={2}>token</Select.Option>
                    </Select>
                </Form.Item>
                {
                    authType === 1 &&
                    <>
                        <Form.Item label="用户名" name="username"
                                   rules={[{required:true,message:"请输入用户名"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="密码" name="password"
                                   rules={[{required:true,message:"请输入密码"}]}
                        >
                            <Input/>
                        </Form.Item>
                    </>
                }
                {
                    authType === 2 &&
                    <Form.Item label="凭证" name="token"
                               rules={[{required:true,message:"请输入凭证"}]}
                    >
                        <Input/>
                    </Form.Item>
                }
            </Form>

        </Modal>
    )
}

export default IdentifyModal