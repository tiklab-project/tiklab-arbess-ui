import React,{useEffect,useState } from "react";
import {Form,Input,Select,Tooltip,Spin} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import AuthType from "../../common/AuthType";
import serverStore from "../store/ServerStore";
import authorizeStore from "../../../pipeline/design/processDesign/gui/store/AuthorizeStore";
import {Validation} from "../../../common/utils/Client";
import Modals from "../../../common/component/modal/Modal";


/**
 * 服务配置弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServerModal = props =>{

    const {visible,setVisible,formValue,findAuth,type, isConfig} = props

    const {createAuthServer,updateAuthServer} = serverStore
    const {skin} = authorizeStore

    const [form] = Form.useForm();

    // 授权类型
    const [serverWay,setServerWay] = useState('gitee');

    useEffect(()=>{
        // 表单初始化
        visible && renderFormValue(formValue)
    },[visible])

    const renderFormValue = formValue => {
        if(formValue){
            form.setFieldsValue(formValue)
            setServerWay(formValue.type)
            return
        }
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
                    }
                })
            }else {
                createAuthServer(values).then(r=>{
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
        if(!skin){
            setVisible(false)
            form.resetFields()
        }
    }


    /**
     * 服务地址是否禁用
     * @returns {boolean}
     */
    const serverAddressDisabled = () => {
        const type = formValue?.type
        if(type==='gittok' || type==='hadess' || type==='teston'){
            return version === 'cloud'
        }
        return false
    }

    const serverWayHtml = () => {
        switch (serverWay) {
            case 'gitee':
            case 'github':
            case 'gitlab':
                return (
                    <Form.Item
                        name={'accessToken'}
                        label={'AccessTocken'}
                        rules={[
                            {required:true,message:"AccessTocken不能空"},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
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
                        ><Input disabled={serverAddressDisabled()} type={"url"}/>
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
                                        <Select.Option value={'gitee'}>Gitee</Select.Option>
                                        <Select.Option value={'github'}>Github</Select.Option>
                                        <Select.Option value={'gitlab'}>Gitlab</Select.Option>
                                        <Select.Option value={'sonar'}>Sonar</Select.Option>
                                        <Select.Option value={'nexus'}>Nexus</Select.Option>
                                    </Select>
                                    :
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={'gitee'}>Gitee</Select.Option>
                                        <Select.Option value={'github'}>Github</Select.Option>
                                        <Select.Option value={'gitlab'}>Gitlab</Select.Option>
                                        <Select.Option value={'gittok'}>GitTok</Select.Option>
                                        <Select.Option value={'teston'}>TestOn</Select.Option>
                                        <Select.Option value={'sonar'}>Sonar</Select.Option>
                                        <Select.Option value={'nexus'}>Nexus</Select.Option>
                                        <Select.Option value={'hadess'}>Hadess</Select.Option>
                                    </Select>
                            }
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                        ><Input/>
                        </Form.Item>
                        { serverWayHtml() }
                    </Form>
                </div>
            </Spin>
        </Modals>
    )
}

export default ServerModal
