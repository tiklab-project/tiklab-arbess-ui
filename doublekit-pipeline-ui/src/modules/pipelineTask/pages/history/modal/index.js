/*
    构建历史筛选弹框
 */

import React from "react";
import {Form, Select, DatePicker, Checkbox, Row,Col,Modal} from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;


const ModalHistory=({visible,onCancel,onCreate})=>{
    const [form]=Form.useForm()
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
    return(
        <Modal
            closable={false}
            visible={visible}
            onCancel={onCancel}
            cancelText='取消'
            okText='确定'
            onOk={oK}
            // getContainer={false}

        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    username:"a",
                    mode:"a",
                    code:"a",
                    voucher:"a"
                }}
            >
                <Form.Item
                    label="状态"
                    name="status"
                >
                    <Checkbox.Group style={{ width: '100%' ,marginBottom:-10}}>
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
                <Form.Item
                    name="time"
                    label='时间'
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item
                    name='username'
                    label='执行人'
                >
                    <Select  >
                        <Option value="a">admin</Option>
                        <Option value="b">lucy</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='mode'
                    label='执行方式'
                >
                    <Select >
                        <Option value="a">自动</Option>
                        <Option value="b">手动</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='code'
                    label='代码源'
                >
                    <Select >
                        <Option value="a">git</Option>
                        <Option value="b">SVN</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='凭证'
                    name='voucher'
                >
                    <Select >
                        <Option value="a">SSH</Option>
                        <Option value="b">password</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default ModalHistory