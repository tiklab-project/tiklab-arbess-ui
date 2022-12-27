import React,{useEffect,useState} from "react";
import Btn from "../../../common/btn/btn";
import {Modal, Form, Input, message, Select} from "antd";
import AuthType from "../../common/authType";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";

const AuthModal = props =>{

    const {visible,setVisible,createAuth,formValue,updateAuth} = props

    const [form] = Form.useForm()

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        if(visible){
            if(formValue){
                form.setFieldsValue(formValue)
            } else {
                form.resetFields()            }
        }
    },[visible])

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue){
                const param = {
                    authId:formValue.authId,
                    ...values,
                }
                updateAuth(param)
            }else {
                createAuth(values)
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
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
            destroyOnClose={true}
        >
            <div className="resources-modal">
                <div className="resources-modal-up">
                    <ModalTitle
                        setVisible={setVisible}
                        title={formValue?"修改":"添加"}
                    />
                </div>
                <div className="resources-modal-content">
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        initialValues={{type:1,authPublic:1,authWay:1,authType:2}}
                    >
                        <Form.Item name="authPublic" label="认证权限">
                            <Select>
                                <Select.Option value={1}>全局</Select.Option>
                                <Select.Option value={2}>私有</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{required:true,message:`请输入名称`}]}
                        >
                            <Input/>
                        </Form.Item>
                        <AuthType/>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default AuthModal