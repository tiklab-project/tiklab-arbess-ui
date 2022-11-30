import React,{useState,useEffect} from "react";
import {Form,Modal,Radio,Checkbox,TimePicker,Row,Col} from "antd";
import Btn from "../../../common/btn/btn";
import {autoHeight} from "../../../common/client/client";
import ModalTitle from "../../../common/modalTitle/modalTitle";


const TriggerAdd = props =>{

    const {triggerVisible,setTriggerVisible} = props
    const [height,setHeight] = useState(0)

    const [form] = Form.useForm()

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    const onOk = fieldsValue =>{
        const value = {
            ...fieldsValue,
            "time":fieldsValue["time"].format("HH:mm"),
        }
        setTriggerVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setTriggerVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            onOk(values)
                        })
                }}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    return(
        <Modal
            visible={triggerVisible}
            onCancel={()=>setTriggerVisible(false)}
            closable={false}
            footer={modalFooter}
            width={500}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="trigger-modal">
                <div className="trigger-modal-up">
                    <ModalTitle
                        setVisible={setTriggerVisible}
                        title={"定时触发"}
                    />
                </div>
                <div className="trigger-modal-content">
                    <Form
                        form={form}
                        layout={"vertical"}
                        initialValues={{type:1,datesss:[1]}}
                    >
                        <Form.Item label="触发方式" name={"type"}>
                            <Radio.Group>
                                <Radio value={1}>item 1</Radio>
                                <Radio value={2}>item 2</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="日期选择" name={"datesss"}>
                            <Checkbox.Group>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value={1}>全选</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={2}>星期一</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={3}>星期二</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={4}>星期三</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={5}>星期四</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={6}>星期五</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={7}>星期六</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value={8}>星期天</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item label="触发时间" name={"time"}>
                            <TimePicker
                                placeholder="触发事件"
                                format={"HH:mm"}

                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </Modal>
    )
}

export default TriggerAdd