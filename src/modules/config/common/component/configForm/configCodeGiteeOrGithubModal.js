import React,{useEffect} from "react";
import {Modal,Form,Input,Select,Row,Button,message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";

const ConfigCodeGiteeOrGithubModal = props =>{

    const {visible,setVisible,formInitialValues,codeType,url,getGiteeProof,getCode,getGithubProof}=props
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({
            proofName:formInitialValues && formInitialValues.proofName,
        })
    },[formInitialValues,visible])

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                proofName:values.proofName,
                proofPassword:JSON.parse(localStorage.getItem("giteeToken"))
                         && JSON.parse(localStorage.getItem("giteeToken")).accessToken,
                proofDescribe:"gitee授权登录",
                user:{id:getUser().userId},
                type:1,
                proofScope:codeType,
                proofType:"password"
            }
            if(codeType  === 2){
                getGiteeProof(params).then(res=>{
                    console.log(res,"gitee授权登录")
                    saveProof(res)
                })
            }else{
                params.proofPassword = localStorage.getItem("githubToken")
                params.proofDescribe = "github授权登录"
                getGithubProof(params).then(res=>{
                    console.log(res,"github授权登录")
                    saveProof(res)
                })
            }
            setVisible(false)
        })
    }

    const saveProof = res =>{
        if(res.code === 0){
            localStorage.setItem("gitProofId",res.data)
        }else {
            message.error({content:"创建失败", className:"message"})
        }
    }

    const goUrl = () =>{
        if(codeType === 2){
            localStorage.setItem("giteeCode","giteeCode")
            url().then(res=>{
                window.open(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else {
            localStorage.setItem("githubCode","githubCode")
            getCode().then(res=>{
                window.open(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }
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

export default ConfigCodeGiteeOrGithubModal