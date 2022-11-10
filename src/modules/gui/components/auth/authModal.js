import React,{useEffect,useState} from "react";
import Btn from "../../../../common/btn/btn";
import {Modal,Form,Input} from "antd";
import AuthType from "./authType";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../../common/client/client";

const AuthModal = props =>{

    const {visible,setVisible,createAuth} = props

    const [form] = Form.useForm()

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
            createAuth(values)
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
            </div>
        </Modal>
    )
}

export default AuthModal