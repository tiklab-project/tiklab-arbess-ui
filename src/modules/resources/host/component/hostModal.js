import React,{useEffect,useState} from "react";
import {Modal, Form, Input, Select, Tooltip} from "antd";
import Btn from "../../../../common/btn/btn";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import AuthType from "../../common/authType";
import {QuestionCircleOutlined} from "@ant-design/icons";


const CodeModal = props =>{

    const {visible,setVisible,createAuthHost,formValue,updateAuthHost} = props

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
                    ip:values.ip,
                    port:values.port,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                createAuthHost(params)
            }else {
                const params = {
                    hostId:formValue.hostId,
                    name:values.name,
                    ip:values.ip,
                    port:values.port,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                    pipelineAuth:{authId:pipelineAuth}
                }
                updateAuthHost(params)
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
                    label={<>Ip地址<Tooltip title="Ip地址">
                        <QuestionCircleOutlined style={{paddingLeft: 5, cursor: "pointer"}}/>
                    </Tooltip></>}
                    name="ip"
                    rules={[
                        {required: true, message: "请输入Ip地址"},
                        {
                            pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                            message:"请输入正确的Ip地址"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="端口" name="port"
                    rules={[{required: true, message: "请输入用户名"}]}
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