import React,{useEffect,useState } from "react";
import {Form, Input, Select, Tooltip, message, Space, Spin} from "antd";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import AuthType from "../../common/AuthType";
import serverStore from "../store/ServerStore";
import authorizeStore from "../../../pipeline/design/processDesign/gui/store/AuthorizeStore";
import {Validation} from "../../../common/utils/Client";
import Btn from "../../../common/component/btn/Btn";
import Modals from "../../../common/component/modal/Modal";


/**
 * 服务配置弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServerModal = props =>{

    const {visible,setVisible,formValue,findAuth,type, isConfig} = props

    const {callbackUrl,createAuthServer,updateAuthServer} = serverStore
    const {findCode,findAccessToken,skin} = authorizeStore

    const [form] = Form.useForm();

    // 授权类型
    const [serverWay,setServerWay] = useState('gitee');
    // 去第三方授权按钮是否禁用
    const [addAuth,setAddAuth] = useState(false);
    // 刷新
    const [fresh,setFresh] = useState(false);
    // 授权信息
    const [infos,setInfos] = useState("");
    // 回调地址
    const [callUrlWarn,setCallUrlWarn] = useState("");

    useEffect(()=>{
        // 表单初始化
        visible && renderFormValue(formValue)
        return ()=> setInfos("")
    },[visible])

    const renderFormValue = formValue => {
        if(formValue){
            form.setFieldsValue(formValue)
            setServerWay(formValue.type)
            return
        }
        setServerWay(type)
        setCallUrlWarn("")
    }

    /**
     * 监听本地存储codeValue
     */
    useEffect(()=>{
        visible && window.addEventListener("storage", authorisation)
        return () => {
            window.removeEventListener("storage", authorisation)
        }
    },[visible,serverWay])

    /**
     * 授权
     */
    const authorisation = () =>{
        let codeValue = localStorage.getItem("codeValue")
        if(codeValue!==null) {
            if (codeValue==="false"){
                message.info("拒绝授权或授权失败")
            }else{
                const params = {
                    type:serverWay,
                    clientId: form.getFieldValue("clientId"),
                    clientSecret: form.getFieldValue("clientSecret"),
                    callbackUrl: form.getFieldValue("callbackUrl"),
                    code:codeValue
                }
                findAccessToken(params).then(res=>{
                    if(res.code===0){
                        setInfos(res.data)
                    }
                })
            }
            localStorage.removeItem("codeValue")
        }
    }


    useEffect(()=>{
        //是否能够去授权
        visible && setAuth()
    },[visible,serverWay,fresh])

    const validCallbackUrl = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/
    const isNull = values => values === null || values === "" || values === " " || values === undefined

    /**
     * 是否能够授权
     */
    const setAuth = () =>{
        if(formValue){
            setAddAuth(false)
        }else {
            let clientId = form.getFieldValue("clientId")
            let clientSecret = form.getFieldValue("clientSecret")
            let callbackUrl = form.getFieldValue("callbackUrl")
            if (isNull(clientId) || isNull(clientSecret) || isNull(callbackUrl) || !validCallbackUrl.test(callbackUrl)) {
                setAddAuth(false)
            } else {
                setAddAuth(true)
            }
        }
    }

    /**
     * 授权id，授权密码，回调地址事件
     * @param value
     */
    const onValuesChange = value => {
        if(value.clientId || value.clientId===""){
            setFresh(!fresh)
        }
        if(value.clientSecret || value.clientSecret===""){
            setFresh(!fresh)
        }
        if(value.callbackUrl || value.callbackUrl===""){
            setFresh(!fresh)
            //获取回调地址
            callbackUrl(value.callbackUrl).then(res=>{
                res.code===0 && setCallUrlWarn(res.data)
            })
        }
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
     * 去第三方授权
     */
    const goUrl = () =>{
        const params = {
            type:serverWay,
            clientId:form.getFieldValue("clientId"),
            clientSecret:form.getFieldValue("clientSecret"),
            callbackUrl:form.getFieldValue("callbackUrl"),
        }
        findCode(params).then(res=>{
            res.code===0 && window.open(res.data)
        })
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
                        onValuesChange={onValuesChange}
                        initialValues={{type:type,authWay:1,authType:1}}
                    >
                        <Form.Item name="type" label="授权类型">
                            {
                                version==='ce'?
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
                                    :
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={'gitee'}>Gitee</Select.Option>
                                        <Select.Option value={'github'}>Github</Select.Option>
                                        <Select.Option value={'gitlab'}>Gitlab</Select.Option>
                                        <Select.Option value={'sonar'}>Sonar</Select.Option>
                                        <Select.Option value={'nexus'}>Nexus</Select.Option>
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
