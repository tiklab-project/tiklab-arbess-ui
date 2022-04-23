import React from "react";
import { Modal,Form,Input,Select ,Row,Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const Config_code_giteeModal = props =>{
    
    const {visible,setVisible}=props
    const [form] = Form.useForm()

    const onOk = () =>{
        form.validateFields().then((values) => {

        })
        setVisible(false)
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
                    'proofType':1
                }}
            >
                <Form.Item label='连接类型' name='proofType'>
                    <Select  style={{ width: 120 }} disabled={true}>
                        <Select.Option value={1}>码云</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='服务连接名' name='proofName' >
                    <Input/>
                </Form.Item>
                <Row>
                    <Form.Item label='服务授权/证书' name='proofUsername' >
                        <Input/>
                    </Form.Item>
                    <Button className='config-details-link' type="link" >
                        <PlusOutlined/>
                        新建
                    </Button>
                </Row>
            </Form>
        </Modal>

    )
}

export default Config_code_giteeModal