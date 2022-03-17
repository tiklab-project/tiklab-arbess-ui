import React from "react";
import {Form, Select, DatePicker, Checkbox, Row,Col,Modal} from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;


const StructureHistoryScreenModal=({visible,onCancel,onCreate})=>{

    const [form]=Form.useForm()

    return(
        <Modal
            closable={false}
            visible={visible}
            onCancel={onCancel}
            cancelText='取消'
            okText='确定'
            onOk={()=>{
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('校验失败:', info);
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{username:1, mode:1, code:1, voucher:1}}
            >
                <Form.Item label="状态" name="status">
                    <Checkbox.Group style={{ width: '100%' ,marginBottom:-10}}>
                        <Row>
                            <Col span={6}>
                                <Checkbox value={1}>成功</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value={2}>终止</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value={3}>失败</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name="time" label='时间'>
                    <RangePicker  />
                </Form.Item>
                <Form.Item name='username' label='执行人'>
                    <Select  >
                        <Option value={1}>admin</Option>
                        <Option value={2}>lucy</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='mode' label='执行方式'>
                    <Select >
                        <Option value={1}>自动</Option>
                        <Option value={2}>手动</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='code' label='代码源'>
                    <Select >
                        <Option value={1}>git</Option>
                        <Option value={2}>SVN</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='凭证' name='voucher'>
                    <Select >
                        <Option value={1}>SSH</Option>
                        <Option value={1}>password</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default StructureHistoryScreenModal;