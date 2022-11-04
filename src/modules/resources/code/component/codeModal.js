import React,{useEffect,useState} from "react";
import {Modal,Form,Input,Select} from "antd";
import Btn from "../../../../common/btn/btn";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import AuthType from "../../common/authType";


const CodeModal = props =>{

    const {visible,setVisible,createAuthCode,formValue,updateAuthCode} = props

    const [form] = Form.useForm()
    const [pipelineAuth,setPipelineAuth] = useState("") // 统一认证

    useEffect(()=>{
        if(visible){
            if(formValue===""){
                form.resetFields()
            } else {
                form.setFieldsValue({
                    formValue,
                    pipelineAuth: formValue.pipelineAuth && formValue.pipelineAuth.name
                })
            }
        }
    },[visible])

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue===""){
                const params = {
                    name:values.name,
                    type:values.type,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                createAuthCode(params)
            }else {
                const params = {
                    codeId:formValue.codeId,
                    name:values.name,
                    type:values.type,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                updateAuthCode(params)
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
            bodyStyle={{maxHeight:750,"overflow": "auto"}}
        >
            <ModalTitle
                setVisible={setVisible}
                title={"添加"}
            />
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
                <Form.Item name="type" label="认证类型">
                    <Select>
                        <Select.Option value={1}>通用</Select.Option>
                        <Select.Option value={2}>第三方授权</Select.Option>
                    </Select>
                </Form.Item>
                <AuthType
                    formValue={formValue}
                    setPipelineAuth={setPipelineAuth}
                />
            </Form>

        </Modal>
    )
}

export default CodeModal