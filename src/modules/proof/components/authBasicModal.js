import React,{useEffect,useState} from "react";
import {Modal,Form,Select,Input,Tooltip,Space,Button,message} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";

const IdentifyModal = props =>{

    const {visible,setVisible,formValue,createAuth,updateAuth,findMessage,findCode,authorizeMes,findState} = props

    const [form] = Form.useForm()
    const [isFindState,setIsFindState] = useState(false) // 是否需要查询状态
    const [ban,setBan] = useState(false) // 是否禁用编辑
    const [identifyType,setIdentifyType] = useState(1) // 认证类型
    const [authorizeType,setAuthorizeType] = useState(2) // 授权类型
    const authId = localStorage.getItem("gitProofId")

    useEffect(()=>{
        if(visible){
            if(formValue===""){
                form.resetFields()
                setIdentifyType(1)
                setBan(false)
            } else {
                form.setFieldsValue(formValue)
                setIdentifyType(formValue.type)
                setBan(true)
            }
        }
    },[visible])

    let interval = null
    useEffect(()=>{
        if(visible && !ban && identifyType===4){
            interval = setInterval(()=>findState().then(res=>warn(res.data)),1000)
        }else clearInterval(interval)
        return ()=> clearInterval(interval)
    },[visible,isFindState,identifyType])

    const warn = data => {
        if(data === 1){
            clearInterval(interval)
            message.success({content:"授权成功", className:"message"})
        }else if(data === 2){
            message.error({content:"拒绝授权或授权失败", className:"message"})
            clearInterval(interval)
        }
    }

    const id = formValue =>{
        switch (formValue.type) {
            case 1:
                return formValue.basicId
            case 2:
                return formValue.otherId
            case 3:
                return formValue.hostId
            case 4:
                return formValue.thirdId
        }
    }

    const onOk = values =>{
        if(formValue){
            const params = {
                type:formValue.type,
                id:id(formValue),
                values,
            }
            updateAuth(params)
        }else {
            const params = {
                type:values.type,
                values
            }
            createAuth(params).then(res=>{
                if(res.code===0 && res.data){
                    clearAuthorize()
                    message.info("创建成功")
                }
            })
        }
        setVisible(false)
    }

    const onCancel = () =>{
        clearAuthorize()
        setVisible(false)
    }

    // 清除第三方授权
    const clearAuthorize = () =>{
        authId && localStorage.removeItem("gitProofId")
    }


    const username = (
        <>
            <Form.Item  label="用户名" name="username"
                        rules={[{required:true,message:"请输入用户名"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item  label="密码" name="password"
                        rules={[{required:true,message:"请输入密码"}]}
            >
                <Input.Password/>
            </Form.Item>
        </>
    )

    const token = label =>{
        return <>
            <Form.Item  label={label} name="token"
                        rules={[{required:true,message:"请输入token"}]}
            >
                {
                    label==="token"?<Input/>:<Input.TextArea/>
                }
            </Form.Item>
        </>
    }


    const authentication = label =>{
        return <>
            <Form.Item label="授权类型" name="authType">
                <Select>
                    <Select.Option value={2}>username&password</Select.Option>
                    <Select.Option value={3}>{label}</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.authType !== currentValues.authType}
            >
                {({getFieldValue}) =>
                    getFieldValue("authType")===2 ?
                        username
                        :
                        token(label)
                }
            </Form.Item>
        </>
    }


    const style ={
        width:472
    }

    const style1 ={
        width:360
    }

    return(
        <Modal
            visible={visible}
            onCancel={onCancel}
            closable={false}
            okText="确认"
            cancelText="取消"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
            bodyStyle={{maxHeight:750,"overflow": "auto"}}
        >
            <ModalTitle
                setVisible={setVisible}
                title={formValue===""? "添加":"修改"}
            />
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{authPublic:1,type:1,authType:2,proofType:1}}
            >
                <Form.Item name="names" label="名称"
                           rules={[{required:true,message:`请输入名称`}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item name="authPublic" label="认证权限">
                    <Select>
                        <Select.Option value={1}>全局</Select.Option>
                        <Select.Option value={2}>私有</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="授权类型" name="authType">
                    <Select>
                        <Select.Option value={2}>username&password</Select.Option>
                        <Select.Option value={3}>{label}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues.authType !== currentValues.authType}
                >
                    {({getFieldValue}) =>
                        getFieldValue("authType")===2 ?
                            <>
                                <Form.Item  label="用户名" name="username"
                                            rules={[{required:true,message:"请输入用户名"}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item  label="密码" name="password"
                                            rules={[{required:true,message:"请输入密码"}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </>
                            :
                            <Form.Item  label="私钥" name="token"
                                        rules={[{required:true,message:"请输入token"}]}
                            >
                                <Input.TextArea/>
                            </Form.Item>
                    }
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default IdentifyModal