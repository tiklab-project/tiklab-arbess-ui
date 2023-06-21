import React,{useEffect,useState} from "react";
import {Form, Input, Tooltip, Select} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import hostStore from "../store/HostStore";
import AuthType from "../../authCommon/AuthType";
import {Validation} from "../../../common/client/Client";
import Btn from "../../../common/btn/Btn";
import Modals from "../../../common/modal/Modal";

/**
 * 主机配置弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HostModal = props =>{

    const {visible,setVisible,formValue,findAuth} = props

    const {createAuthHost,updateAuthHost} = hostStore

    const [form] = Form.useForm()

    const [hostType,setHostType] = useState('common')

    useEffect(()=>{
        if(visible){
            // 表单初始化
            if(formValue){
                form.setFieldsValue(formValue)
            }
        }
    },[visible])

    /**
     * 确定添加或者更新
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue){
                const params = {
                    hostId:formValue.hostId,
                    ...values
                }
                updateAuthHost(params).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }else {
                createAuthHost(values).then(r=>{
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
        setVisible(false)
        form.resetFields()
    }

    const changHostType = value =>{
        setHostType(value)
    }

    const modalFooter = (
        <>
            <Btn onClick={onCancel} title={"取消"} isMar={true}/>
            <Btn onClick={onOk} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={onCancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{type:31,authPublic:1,authWay:1,authType:2}}
                >
                    <Form.Item
                        name="type"
                        label="授权类型"
                    >
                        <Select
                            onChange={changHostType}
                            // disabled={ban}
                            disabled={true}
                        >
                            <Select.Option value={'common'}>普通</Select.Option>
                            <Select.Option value={'aliyun'}>aliyun</Select.Option>
                            <Select.Option value={'tencent'}>腾讯云主机</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="authPublic" label="认证权限">
                        <Select>
                            <Select.Option value={1}>全局</Select.Option>
                            <Select.Option value={2}>私有</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={<>Ip地址<Tooltip title="Ip地址">
                            <QuestionCircleOutlined style={{paddingLeft: 5, cursor: "pointer"}}/>
                        </Tooltip></>}
                        name="ip"
                        rules={[
                            {required: true, message: "Ip地址不能为空"},
                            {
                                pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                                message:"请输入正确的Ip地址"
                            }
                        ]}
                    >
                        <Input/>
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
                        <Input/>
                    </Form.Item>
                    <AuthType/>
                </Form>
            </div>
        </Modals>
    )
}

export default HostModal
