import React,{useEffect,useState} from "react";
import {Modal, Form, Input, Tooltip, Select} from "antd";
import Btn from "../../../../common/btn/btn";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import AuthType from "./authType";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {autoHeight} from "../../../../common/client/client";


const CodeModal = props =>{

    const {visible,setVisible,createAuthHost} = props

    const [form] = Form.useForm()

    const [hostType,setHostType] = useState(1)
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        visible && form.resetFields()
    },[visible])

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }
    const onOk = () =>{
        form.validateFields().then((values) => {
            createAuthHost(values)
            setVisible(false)
        })
    }

    const changHostType = value =>{
        setHostType(value)
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
            className="mf"
        >
            <ModalTitle
                setVisible={setVisible}
                title={"添加"}
            />
            <div style={{maxHeight:"calc(100% - 120px)",overflow:"auto"}}>
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
                    <AuthType/>
                </Form>
            </div>
        </Modal>
    )
}

export default CodeModal