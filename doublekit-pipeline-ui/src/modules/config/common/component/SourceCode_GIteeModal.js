import React from 'react'
import {Form, Select, Input, Modal,Row,Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

const SourceCode_GiteeModal = props =>{

    const {visible,setVisible,url,getGiteeProof,configureId,
        proofUsername,readOnly}=props
    const [form] = Form.useForm()

    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                configureId:configureId,
                proofName:values.proofName,
            }
            getGiteeProof(params)
        })
        setVisible(false)
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
                    "proofUsername":proofUsername ? proofUsername:' ',
                }}
            >
                <Form.Item label='连接类型' name='proofType'>
                    <Select  style={{ width: 120 }} disabled={true}>
                        <Option value={1}>码云</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='服务连接名' name='proofName' >
                    <Input/>
                </Form.Item>
                <Row>
                    <Form.Item label='服务授权/证书' name='proofUsername' >
                        <Input  readOnly={readOnly} />
                    </Form.Item>
                    <Button className='config-details-link config-link' type="link" onClick={goUrl}>
                        <PlusOutlined/>
                        新建
                    </Button>
                </Row>
            </Form>
        </Modal>
    )
}

export default SourceCode_GiteeModal