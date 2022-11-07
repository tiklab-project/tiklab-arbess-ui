import React,{useEffect,useState} from "react";
import {Modal, Form, Input, Tooltip, Select} from "antd";
import Btn from "../../../../common/btn/btn";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import AuthType from "../../common/authType";
import {QuestionCircleOutlined} from "@ant-design/icons";


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
        autoHeight()
    },[height])


    const autoHeight = () =>{
        let winHeight=0
        if (window.innerHeight)
            winHeight = window.innerHeight-200
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight-200
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight-200
        setHeight(winHeight)
        window.onresize=autoHeight
    }

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue===""){
                createAuthHost(values)
            }else {
                const params = {
                    hostId:formValue.hostId,
                    name:values.name,
                    ip:values.ip,
                    port:values.port,
                    type:values.type,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                }
                updateAuthHost(params)
            }
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
            style={{height:height}}
        >
            <ModalTitle
                setVisible={setVisible}
                title={formValue===""?"添加":"修改"}
            />
            <div style={{maxHeight:"calc(100% - 120px)",overflow:"auto"}}>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{type:1,authPublic:1,authWay:1,authType:2}}
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
                            <Select.Option value={1}>普通</Select.Option>
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