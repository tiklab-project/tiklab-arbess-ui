import React,{useEffect} from "react";
import {Form,Radio,Checkbox,TimePicker,Row,Col} from "antd";
import moment from "moment";
import Modals from "../../../../common/component/modal/Modal";

/**
 * 触发器添加，编辑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TriggerAddEdit = props =>{

    const {findTrigger,triggerVisible,setTriggerVisible,createTrigger,pipelineId,formValue,updateTrigger} = props

    const [form] = Form.useForm()

    useEffect(()=>{
        if(triggerVisible){
            if(formValue) {
                // 表单初始化
                form.setFieldsValue({
                    taskType: formValue.taskType,
                    timeList: formValue.timeList,
                    time: moment(formValue.time, "HH:mm")
                })
            }else {
                form.resetFields()
            }
        }
    },[triggerVisible])

    /**
     * 触发器添加更新确定
     */
    const onOk = () =>{
        form.validateFields().then((fieldsValue)=>{
            const param = {
                values:{
                    taskType:fieldsValue.taskType,
                    time:fieldsValue.time && fieldsValue.time.format("HH:mm"),
                    timeList:fieldsValue.timeList
                },
                pipeline:{id:pipelineId},
                taskType:81,
            }
            if(formValue){
                updateTrigger({
                    ...param,
                    triggerId:formValue.triggerId
                }).then(res=>{
                    if(res.code===0){
                        findTrigger()
                    }
                })
            }else {
                createTrigger(param).then(res=>{
                    if(res.code===0){
                        findTrigger()
                    }
                })
            }
            setTriggerVisible(false)
        })
    }

    return(
        <Modals
            visible={triggerVisible}
            onCancel={()=>setTriggerVisible(false)}
            onOk={onOk}
            width={500}
            title={formValue?"修改":"添加"}
        >
            <div className="trigger-modal">
                <Form
                    form={form}
                    layout={"vertical"}
                    initialValues={{taskType:1,timeList:[1]}}
                >
                    <Form.Item label="触发方式" name={"taskType"}>
                        <Radio.Group>
                            <Radio value={1}>单次触发</Radio>
                            <Radio value={2}>周期触发</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="日期选择" name={"timeList"} rules={[{required:true,message:"日期选择不能为空"}]}>
                        <Checkbox.Group>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value={1} >星期一</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={2} >星期二</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={3} >星期三</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={4} >星期四</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={5} >星期五</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={6} >星期六</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value={7} >星期天</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="触发时间" name={"time"} rules={[{required:true,message:"触发时间不能为空"},]}>
                        <TimePicker placeholder="触发时间" format={"HH:mm"}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default TriggerAddEdit
