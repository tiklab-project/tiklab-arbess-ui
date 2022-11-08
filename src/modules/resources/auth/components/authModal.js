import React,{useEffect,useState} from "react";
import Btn from "../../../../common/btn/btn";
import {Modal,Form,Input} from "antd";
import AuthType from "../../common/authType";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const AuthModal = props =>{

    const {visible,setVisible,createAuth,formValue,updateAuth} = props

    const [form] = Form.useForm()

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        if(visible){
            if(formValue===""){
                form.resetFields()
            } else {
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
            winHeight = window.innerHeight-120
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight-120
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight-120
        setHeight(winHeight)
        window.onresize=autoHeight
    }

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue===""){
                createAuth(values)
            }else {
                const param = {
                    authId:formValue.authId,
                    name:values.name,
                    authPublic:values.authPublic,
                    authType:values.authType,
                    username:values.username,
                    password:values.password,
                    privateKey:values.privateKey,
                }
                updateAuth(param)
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
            className="mf"
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