import React,{useEffect} from "react";
import {Form, Input, Select} from "antd";
import AuthType from "../../../common/AuthType";
import {Validation} from "../../../../common/utils/Client";
import authStore from "../store/AuthStore";
import Modals from "../../../../common/component/modal/Modal";

/**
 * 认证配置弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AuthModal = props =>{

    const {visible,setVisible,formValue,findAuth} = props

    const {createAuth,updateAuth} = authStore

    const [form] = Form.useForm()

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
                updateAuth(param).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }else {
                createAuth(values).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }
            setVisible(false)
        })
    }

    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{type:1,authWay:1,authType:2}}
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
        </Modals>
    )
}

export default AuthModal
