/**
 * @Description: 服务集成添加编辑弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState } from "react";
import {Form,Input,Select,Tooltip,Spin} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import AuthType from "../../../common/AuthType";
import serverStore from "../store/ServerStore";
import authorizeStore from "../../../../pipeline/design/processDesign/gui/store/AuthorizeStore";
import {Validation} from "../../../../common/utils/Client";
import Modals from "../../../../common/component/modal/Modal";
import {
    serverGitee,
    serverGithub,
    serverGitlab,
    serverPriGitlab,
    serverGitpuk,
    serverTesthubo,
    serverSonar,
    serverNexus,
    serverHadess
} from "../../../../common/utils/Constant";

export const serverTitle = {
    [serverGitee]: 'Gitee',
    [serverGithub]: 'Github',
    [serverGitlab]: 'Gitlab',
    [serverPriGitlab]: '自建Gitlab',
    [serverSonar]: 'Sonar',
    [serverNexus]: 'Nexus',
    [serverGitpuk]: 'GitPuk',
    [serverTesthubo]: 'TestHubo',
    [serverHadess]: 'Hadess',
}

const ServerModal = props =>{

    const {visible,setVisible,formValue,findAuth,type, isConfig} = props

    const {createAuthServer,updateAuthServer} = serverStore
    const {skin} = authorizeStore

    const [form] = Form.useForm();

    // 授权类型
    const [serverWay,setServerWay] = useState(serverGitee);

    useEffect(()=>{
        // 表单初始化
        if(visible){
            renderFormValue(formValue)
        }
    },[visible])

    const renderFormValue = formValue => {
        if(formValue){
            form.setFieldsValue(formValue)
            setServerWay(formValue.type)
            return
        }
        form.setFieldsValue({type:type})
        setServerWay(type)
    }

    /**
     * 改变授权类型
     * @param value
     */
    const changeServerWay = value =>{
        setServerWay(value)
    }

    /**
     * 服务配置添加或者更新确定
     */
    const onOk = () =>{
        if(skin) return
        form.validateFields().then((values) => {
            if(formValue){
                const param = {
                    serverId:formValue.serverId,
                    ...values,
                }
                updateAuthServer(param).then(r=>{
                    if(r.code===0){
                        findAuth()
                        onCancel()
                    }
                })
            }else {
                createAuthServer(values).then(r=>{
                    if(r.code===0){
                        findAuth()
                        onCancel()
                    }
                })
            }
        })
    }

    /**
     * 关闭弹出框
     */
    const onCancel = () => {
        if(!skin){
            form.resetFields()
            setVisible(false)
        }
    }


    /**
     * 服务地址是否禁用
     * @returns {boolean}
     */
    const serverAddressDisabled = () => {
        const type = formValue?.type
        if(type===serverGitpuk || type===serverHadess || type===serverTesthubo){
            return version === 'cloud'
        }
        return false
    }

    const serverWayHtml = () => {
        switch (serverWay) {
            case serverGitee:
            case serverGithub:
            case serverGitlab:
                return (
                    <Form.Item
                        name={'accessToken'}
                        label={'AccessTocken'}
                        rules={[
                            {required:true,message:"AccessTocken不能空"},
                        ]}
                    >
                        <Input placeholder={'AccessTocken'}/>
                    </Form.Item>
                )
            case serverPriGitlab:
                return (
                    <>
                        <Form.Item
                            name={'serverAddress'}
                            label={'Gitlab服务器地址'}
                            rules={[
                                {required:true,message:"Gitlab服务器地址不能空"},
                                {
                                    pattern:/^(https?:\/\/)[^\s\/]+(\.[^\s\/]+)+(\/[^\s\/]*)*[^\s\/\\.,。，、;:'"?!]$/,
                                    message:"请输入正确的Gitlab服务器地址"
                                }
                            ]}
                        >
                            <Input placeholder={'Gitlab服务器地址，如 http://172.13.1.10:80'}/>
                        </Form.Item>
                        <Form.Item
                            name={'accessToken'}
                            label={'AccessTocken'}
                            rules={[
                                {required:true,message:"AccessTocken不能空"},
                            ]}
                        >
                            <Input placeholder={'AccessTocken'}/>
                        </Form.Item>
                    </>
                )
            default:
                return (
                    <>
                        <Form.Item
                            label={
                                <>  服务器地址
                                    <Tooltip title="服务器地址">
                                        <QuestionCircleOutlined style={{paddingLeft:5,cursor:"pointer"}}/>
                                    </Tooltip>
                                </>}
                            name="serverAddress"
                            rules={[
                                {required:true,message:"服务器地址不能空"},
                                {
                                    pattern:/^(https?:\/\/)[^\s\/]+(\.[^\s\/]+)+(\/[^\s\/]*)*[^\s\/\\.,。，、;:'"?!]$/,
                                    message:"请输入正确的服务地址"
                                }
                            ]}
                        ><Input disabled={serverAddressDisabled()} type={"url"} placeholder={'服务器地址'}/>
                        </Form.Item>
                        <AuthType/>
                    </>
                )
        }
    }

    return(
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <Spin spinning={skin} tip="获取授权信息...">
                <div className="resources-modal">
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        initialValues={{type:type,authWay:1,authType:1}}
                    >
                        <Form.Item name="type" label="授权类型">
                            {
                                version==='cloud'?
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={serverGitee}>{serverTitle[serverGitee]}</Select.Option>
                                        <Select.Option value={serverGithub}>{serverTitle[serverGithub]}</Select.Option>
                                        <Select.Option value={serverGitlab}>{serverTitle[serverGitlab]}</Select.Option>
                                        <Select.Option value={serverPriGitlab}>{serverTitle[serverPriGitlab]}</Select.Option>
                                        <Select.Option value={serverSonar}>{serverTitle[serverSonar]}</Select.Option>
                                        <Select.Option value={serverNexus}>{serverTitle[serverNexus]}</Select.Option>
                                    </Select>
                                    :
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={serverGitee}>{serverTitle[serverGitee]}</Select.Option>
                                        <Select.Option value={serverGithub}>{serverTitle[serverGithub]}</Select.Option>
                                        <Select.Option value={serverGitlab}>{serverTitle[serverGitlab]}</Select.Option>
                                        <Select.Option value={serverPriGitlab}>{serverTitle[serverPriGitlab]}</Select.Option>
                                        <Select.Option value={serverGitpuk}>{serverTitle[serverGitpuk]}</Select.Option>
                                        <Select.Option value={serverTesthubo}>{serverTitle[serverTesthubo]}</Select.Option>
                                        <Select.Option value={serverSonar}>{serverTitle[serverSonar]}</Select.Option>
                                        <Select.Option value={serverNexus}>{serverTitle[serverNexus]}</Select.Option>
                                        <Select.Option value={serverHadess}>{serverTitle[serverHadess]}</Select.Option>
                                    </Select>
                            }
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                        ><Input placeholder={'名称'}/>
                        </Form.Item>
                        { serverWayHtml() }
                    </Form>
                </div>
            </Spin>
        </Modals>
    )
}

export default ServerModal
