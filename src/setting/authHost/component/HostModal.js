import React,{useEffect,useState} from "react";
import {Modal, Form, Input, Tooltip, Select, message} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import ModalTitle from "../../../common/modalTitle/ModalTitle";
import AuthType from "../../authCommon/AuthType";
import {autoHeight, Validation} from "../../../common/client/Client";


const CodeModal = props =>{

    const {visible,setVisible,createAuthHost,formValue,updateAuthHost} = props

    const [form] = Form.useForm()

    const [hostType,setHostType] = useState(1)
    const [ban,setBan] = useState(false)
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        if(visible){
            if(formValue===""){
                form.resetFields()
                setBan(false)
            } else {
                setBan(true)
                form.setFieldsValue(formValue)
            }
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
                const params = {
                    hostId:formValue.hostId,
                    ...values
                }
                updateAuthHost(params)
            }else {
                createAuthHost(values)
            }
            setVisible(false)
        })
    }

    const changHostType = value =>{
        setHostType(value)
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
            destroyOnClose={true}
            className="mf"
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
                        initialValues={{type:31,authPublic:1,authWay:1,authType:2}}
                    >
                        <Form.Item
                            name="type"
                            label="授权类型"
                        >
                            <Select
                                onChange={changHostType}
                                // disabled={ban}
                                disabled={true}
                            >
                                <Select.Option value={31}>普通</Select.Option>
                                <Select.Option value={2}>aliyun</Select.Option>
                                <Select.Option value={3}>腾讯云主机</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="authPublic" label="认证权限">
                            <Select>
                                <Select.Option value={1}>全局</Select.Option>
                                <Select.Option value={2}>私有</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{required:true,message:`请输入名称`},Validation("名称")]}
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
                        <AuthType/>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default CodeModal
