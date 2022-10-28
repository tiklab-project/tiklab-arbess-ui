import React,{useEffect} from "react";
import {Modal,Form,Input,Select,Row,Button,message} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const CodeGiteeOrGithubModal = props =>{

    const {visible,setVisible,formInitialValues,codeType,
        findCode,isFindState,setIsFindState,updateProof,
    }=props
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({
            proofName:formInitialValues && formInitialValues.proofName,
        })
    },[formInitialValues,visible])

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                name:values.name,
                proofId:localStorage.getItem("gitProofId")
            }
            updateProof(params).then(res=>{
                if(res.code===0){
                    message.info({content:"创建成功", className:"message"})
                }else{
                    message.error({content:"创建失败", className:"message"})
                }
                localStorage.removeItem("gitProofId")
            })
            setVisible(false)
        })
    }

    const goUrl = () =>{
        findCode(codeType).then(res=>{
            res.code===0 && window.open(res.data)
        })
        setIsFindState(!isFindState)
        localStorage.setItem("code",codeType)
    }

    return(
        <Modal
            visible={visible}
            closable={false}
            forceRender
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            okText="确认"
            cancelText="取消"
        >
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
                initialValues={{"proofType":1}}
            >
                <Form.Item label="连接类型" name="proofType">
                    <Select  style={{ width: 120 }} disabled={true}>
                        <Select.Option value={1}>码云</Select.Option>
                    </Select>
                </Form.Item>
                <Row>
                    <Form.Item
                        label="服务连接名"
                        name="proofName"
                        rules={[{ required: true, message: "请输入服务连接名" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Button onClick={()=>goUrl()} style={{marginTop:30}} type="link">
                        <PlusOutlined/>
                        新建
                    </Button>
                </Row>
            </Form>
        </Modal>
    )
}

export default CodeGiteeOrGithubModal
