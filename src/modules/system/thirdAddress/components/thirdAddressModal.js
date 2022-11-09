import React,{useEffect} from "react";
import {Modal,Form,Select,Input} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const ThirdAddressModal = props =>{

    const {visible,setVisible,formValue,createAuthorize,updateAuthorize,fresh,setFresh} = props

    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            if(formValue){
                form.setFieldsValue(formValue)
            }else form.resetFields()
        }
    },[visible])

    const onOk = value =>{
        if(formValue){
            const params = {
                id:formValue.id,
                type:value.type,
                clientId:value.clientId,
                clientSecret:value.clientSecret,
                callbackUrl:value.callbackUrl,
            }
            updateAuthorize(params).then(res=>{
                shua(res)
            })
        }else {
            createAuthorize(value).then(res=>{
                shua(res)
            })
        }
        setVisible(false)
    }
    const shua = data =>{
        if(data.code===0){
            setFresh(!fresh)
        }
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            okText="确认"
            cancelText="取消"
            className="mf"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
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
                initialValues={{type:2}}
            >
                <Form.Item name="authType" label="类型"
                           rules={[{required:true,message:`请选择类型`}]}
                >
                    <Select>
                        <Select.Option value={2}>gitee</Select.Option>
                        <Select.Option value={3}>github</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="授权id" name="clientId"
                           rules={[{required:true,message:`请输入授权id`}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="授权密码" name="clientSecret"
                           rules={[{required:true,message:`请输入授权密码`}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="回调地址" name="callbackUrl"
                           rules={[{required:true,message:`请输入回调地址`}]}
                >
                    <Input/>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default ThirdAddressModal