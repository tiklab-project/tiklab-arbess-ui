import React from 'react'
import {Form, Select, Input, Modal,Row,Col} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";

const { Option } = Select;

const SourceCode_GiteeModal = props =>{

    const {visible,setVisible,url}=props

    const [form] = Form.useForm();


    const onOk = () =>{
        form.validateFields().then((values) => {

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
            form={form}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={onOk}
        >
            <Form form={form} layout="vertical" name="userForm" >
                <Form.Item label='连接类型' name='proofType'>
                    <Select defaultValue="disabled" style={{ width: 120 }} disabled={true}>
                        <Option value="disabled">码云</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='服务连接名' name='proofName' >
                    <Input/>
                </Form.Item>
                <Row>
                    <Col>
                        <Form.Item label='服务授权/证书' name='proofName' >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <div className='config-details-link' onClick={goUrl}>
                            <PlusCircleOutlined/>
                            新建
                        </div>
                    </Col>
                </Row>

            </Form>
        </Modal>
    )
}

export default SourceCode_GiteeModal