import React,{useEffect,useState} from "react";
import {Modal,Form,Input,Select} from "antd";
import Btn from "../../../../common/btn/btn";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import AuthType from "../../common/authType";


const CodeModal = props =>{

    const {visible,setVisible,createAuthCodeScan,formValue,updateAuthCodeScan} = props

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

    console.log(formValue)

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue===""){
                const params = {
                    name:values.name,
                    serverAddress:values.serverAddress,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                createAuthCodeScan(params)
            }else {
                const params = {
                    codeScanId:formValue.codeScanId,
                    name:values.name,
                    serverAddress:values.serverAddress,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                updateAuthCodeScan(params)
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
                <Form.Item
                    label="服务地址"
                    name="serverAddress"
                    rules={[{required:true,message:`请输入服务地址`}]}
                >
                    <Input/>
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