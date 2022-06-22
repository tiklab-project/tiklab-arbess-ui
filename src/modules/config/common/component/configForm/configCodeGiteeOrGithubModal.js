import React, {useEffect} from "react";
import { Modal,Form,Input,Select ,Row,Button,message} from "antd";
import moment from "../../../../../common/moment/moment";
import {PlusOutlined} from "@ant-design/icons";

const ConfigCodeGiteeOrGithubModal = props =>{

    const {visible,setVisible,formInitialValues,codeType,url,getGiteeProof,giteeToken,getCode,getGithubProof,
        githubToken }=props
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({
            proofName:formInitialValues && formInitialValues.proofName,
        })
    },[formInitialValues])

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(codeType  === 2){
                const params = {
                    proofName:values.proofName,
                    accessToken:giteeToken && giteeToken.accessToken,
                    proofCreateTime:moment.moment,
                }
                getGiteeProof(params).then(res=>{
                    console.log(res,'accessToken')
                    if(res.code === 0){
                        localStorage.setItem('gitProofId',res.data)
                    }else {
                        message.error({content:'创建失败', className:'message'})
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }else{
                const params = {
                    proofName:values.proofName,
                    accessToken:githubToken,
                    proofCreateTime:moment.moment,
                }
                getGithubProof(params).then(res=>{
                    console.log(res,'accessToken')
                    if(res.code===0){
                        localStorage.setItem('gitProofId',res.data)
                    }else {
                        message.error({content:'创建失败', className:'message'})
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
            setVisible(false)
        })
    }

    const goUrl = () =>{
        if(codeType  === 2){
            localStorage.setItem('giteeCode','giteeCode')
            url().then(res=>{
                window.open(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }else {
            localStorage.setItem('githubCode','githubCode')
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
                initialValues={{
                    'proofType':1,
                }}
            >
                <Form.Item label='连接类型' name='proofType'>
                    <Select  style={{ width: 120 }} disabled={true}>
                        <Select.Option value={1}>码云</Select.Option>
                    </Select>
                </Form.Item>
                <Row>
                    <Form.Item
                        label='服务连接名'
                        name='proofName'
                        rules={[{ required: true, message: '请输入服务连接名' }]}
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