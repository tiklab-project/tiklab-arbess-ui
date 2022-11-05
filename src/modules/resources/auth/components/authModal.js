import React,{useEffect} from "react";
import Btn from "../../../../common/btn/btn";
import {Modal,Form,Input} from "antd";
import AuthType from "../../common/authType";

const AuthModal = props =>{

    const {visible,setVisible,createAuth,formValue,updateAuth} = props

    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            if(formValue===""){
                form.resetFields()
            } else {
                form.setFieldsValue(formValue)
            }
        }
    },[visible])

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue===""){
                createAuth(values)
            }else {
                const param = {
                    authId:formValue.authId,
                    name:values.name,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                }
                updateAuth(param)
            }
            setVisible(false)
        })
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={onOk}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={modalFooter}
            bodyStyle={{maxHeight:750,"overflow":"auto"}}
        >
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
                initialValues={{type:1,authPublic:1,authWay:1,authType:2}}
            >
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[{required:true,message:`请输入名称`}]}
                >
                    <Input/>
                </Form.Item>
                <AuthType/>
            </Form>
        </Modal>
    )
}

export default AuthModal