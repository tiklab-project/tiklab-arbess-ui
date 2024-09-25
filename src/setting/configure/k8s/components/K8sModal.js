import React, {useEffect} from "react";
import {Form, Input, Tooltip} from "antd";
import Modals from "../../../../common/component/modal/Modal";
import {Validation} from "../../../../common/utils/Client";
import {QuestionCircleOutlined} from "@ant-design/icons";
import AuthType from "../../../common/AuthType";
import k8sStore from "../store/K8sStore";

const K8sModal = (props) => {

    const {visible,setVisible,formValue,findAuth} = props

    const {createAuthHostK8s,updateAuthHostK8s} = k8sStore;

    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            form.setFieldsValue(formValue)
        }
    },[visible])

    const onOk = () => {
        form.validateFields().then(values => {
            if(formValue){
                const params = {
                    hostId:formValue.hostId,
                    type:'k8s',
                    ...values,
                }
                updateAuthHostK8s(params).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }else {
                createAuthHostK8s({
                    type:'k8s',
                    ...values,
                }).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }
            onCancel()
        })
    }

    /**
     * 关闭弹出框
     */
    const onCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return (
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{type:"common",authWay:1,authType:1}}
                >
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                    >
                        <Input placeholder={'名称'}/>
                    </Form.Item>
                    <Form.Item
                        label={<>Ip地址<Tooltip title="Ip地址">
                            <QuestionCircleOutlined style={{paddingLeft: 5, cursor: "pointer"}}/>
                        </Tooltip></>}
                        name="ip"
                        rules={[
                            {required: true, message: "Ip地址不能为空"},
                            {
                                pattern:/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
                                message:"请输入正确的Ip地址"
                            }
                        ]}
                    >
                        <Input placeholder={'Ip地址'}/>
                    </Form.Item>
                    <Form.Item
                        label="端口" name="port"
                        rules={[
                            {required: true, message: "端口不能为空"},
                            {
                                pattern:/^[0-9]*$/,
                                message:"端口只包含整数"
                            }
                        ]}
                    >
                        <Input placeholder={'端口'}/>
                    </Form.Item>
                    <AuthType/>
                </Form>
            </div>
        </Modals>
    )
}

export default K8sModal
