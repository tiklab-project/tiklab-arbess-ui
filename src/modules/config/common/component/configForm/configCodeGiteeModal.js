import React, {useEffect,useState} from "react";
import { Modal,Form,Input,Select ,Row,Button,message} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const {Option}=Select

const ConfigCodeGiteeModal = props =>{

    const {visible,setVisible,url,codeTaken,
        getGiteeProof , modalFormInvi,findAllProof}=props
    const [form] = Form.useForm()

    const [allGiteeProofList,setAllGiteeProofList] = useState([])

    useEffect(()=>{
        form.setFieldsValue({
            proofName:modalFormInvi && modalFormInvi.proofName,
            proofUsername:modalFormInvi && modalFormInvi.proofDescribe+ " (" + modalFormInvi.proofUsername + ")"
        })
    },[modalFormInvi])

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(codeTaken){
                const params = {
                    proofName:values.proofName,
                    accessToken:codeTaken.accessToken
                }
                getGiteeProof(params).then(res=>{
                    console.log(res,'accessToken')
                    if(res.code===0){
                        localStorage.setItem('giteeProofId',res.data)
                        setVisible(false)
                    }else {
                        message.info('创建失败')
                    }
                })
            }

        })
    }

    const clickFindAllGitee = () => {
        const param = {
            type :3
        }
        findAllProof(param).then(res=>{
            console.log('Gitee凭证',res)
            setAllGiteeProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGiteeSelect = value =>{
        // localStorage.setItem('gitProofId',value)
        localStorage.setItem('giteeProofId',value)
    }

    const goUrl = () =>{
        localStorage.setItem('code','code')
        url().then(res=>{
            window.open(res.data)
        })
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
                <Form.Item
                    label='服务连接名'
                    name='proofName'
                    rules={[{ required: true, message: '请输入' }]}
                >
                    <Input/>
                </Form.Item>
                <Row>
                    <Form.Item label='服务授权/证书' name='proofUsername' >
                        <Select
                            style={{ width: 300 }}
                            onChange={changeGiteeSelect}
                            onClick={clickFindAllGitee}
                        >
                            <Option >
                                无
                            </Option>
                            {
                                allGiteeProofList && allGiteeProofList.map(item=>{
                                    return(
                                        <Option key={item.proofId} value={item.proofId} >
                                            { item.proofDescribe+ " (" + item.proofUsername + ")"}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Button
                        onClick={()=>goUrl()}
                        className='config-details-link' type="link"
                    >
                        <PlusOutlined/>
                        新建
                    </Button>
                </Row>
            </Form>
        </Modal>

    )
}

export default ConfigCodeGiteeModal