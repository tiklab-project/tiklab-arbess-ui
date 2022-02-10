import React from 'react';
import {  Modal, Form,Select,Checkbox,Row,Col,DatePicker } from 'antd';
const {Option}=Select

const Config_pastRecordsScreenModal = ({ visible, onCreate }) => {
    const [form] = Form.useForm();
    const oK=()=>{
        form
            .validateFields()
            .then(values => {
                onCreate(values);
            })
            .catch(info => {
                console.log('校验失败:', info);
            })
    }
    return (
        <Modal
            closable={false}
            getContainer={false}
            width={400}
            visible={visible}
            onCancel={()=>{
                form.resetFields();
            }}
            onOk={oK}
            cancelText='重置'
            okText='确定'
        >
            <Form
                form={form}
                initialValues={{changeUsers:"a"}}
            >
                <Form.Item
                    name='changeUsers'
                    label='更改人'
                >
                    <Select
                        style={{width:200}}
                    >
                        <Option value="a">admin</Option>
                        <Option value="b">lucy</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='changeTime'
                    label='更改时间'
                >
                    <DatePicker  />
                </Form.Item>

                <Form.Item
                    label="状态"
                    name="status"
                >
                    <Checkbox.Group
                        style={{ width: '100%' }}
                    >
                        <Row>
                            <Col span={6}>
                                <Checkbox value="A">成功</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value="B">停止</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value="C">失败</Checkbox>
                            </Col>

                        </Row>
                    </Checkbox.Group>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default Config_pastRecordsScreenModal;
