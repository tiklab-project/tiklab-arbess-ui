import React,{useEffect,useState} from "react";
import {Modal, Form, Input, message, Select} from "antd";
import AuthType from "../../authCommon/AuthType";
import {autoHeight, Validation} from "../../../common/client/Client";
import ModalTitle from "../../../common/modalTitle/ModalTitle";
import Btn from "../../../common/btn/Btn";

/**
 * 认证配置弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AuthModal = props =>{

    const {visible,setVisible,createAuth,formValue,updateAuth} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        if(visible){
            //  表单初始化
            if(formValue){
                form.setFieldsValue(formValue)
                return
            }
            form.resetFields()
        }
    },[visible])

    /**
     * 认证添加或更新确定
     */
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
            <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
            <Btn onClick={onOk} title={"确定"} type={"primary"}/>
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
                    <ModalTitle setVisible={setVisible} title={formValue?"修改":"添加"}/>
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
                            rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                        ><Input/>
                        </Form.Item>
                        <AuthType/>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default AuthModal
