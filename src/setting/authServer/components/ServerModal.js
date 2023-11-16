import React,{useEffect,useState } from "react";
import {Form, Input, Select, Tooltip, message, Space, Spin} from "antd";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import AuthType from "../../authCommon/AuthType";
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

    const [form] = Form.useForm()

    // 授权类型
    const [serverWay,setServerWay] = useState('gitee')

    // 去第三方授权按钮是否禁用
    const [addAuth,setAddAuth] = useState(false)

    // 刷新
    const [fresh,setFresh] = useState(false)

    // 授权信息
    const [infos,setInfos] = useState("")

    // 回调地址
    const [callUrlWarn,setCallUrlWarn] = useState("")

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

    // 渲染Gitee和Github授权表单
    const authorize = (
       <>
           <Form.Item label="授权id" name="clientId" rules={[{required:true,message:`授权id不能空`}]}>
               <Input disabled={formValue}/>
           </Form.Item>
           <Form.Item label="授权密码" name="clientSecret" rules={[{required:true,message:`授权密码不能空`}]}>
               <Input disabled={formValue}/>
           </Form.Item>
           <Form.Item
               name="callbackUrl"
               label={
                   <>  回调地址
                       <Tooltip title="回调地址">
                           <QuestionCircleOutlined style={{paddingLeft:5,cursor:"pointer"}}/>
                       </Tooltip>
                   </>
               }
               rules={[
                   {required:true,message:`回调地址不能空`},
                   {
                       pattern:validCallbackUrl,
                       message:"不是有效的回调地址"
                   },
              ]}
           ><Input disabled={formValue}/>
           </Form.Item>
           {
               callUrlWarn &&
               <div style={{
                   marginTop:-10,
                   fontSize:13,
                   color:"#999",
                   paddingBottom:10,
               }}>将下方地址设置为应用{serverWay==='gitee'?"Gitee":"Github"}回调地址{callUrlWarn}</div>
           }
           <Space>
               <Form.Item name="message" label="服务授权信息" rules={[{required:true,message: "服务授权信息不能空" }]}>
                   <Select style={{width:360}} disabled={formValue}>
                       <Select.Option value={infos}>{infos}</Select.Option>
                   </Select>
               </Form.Item>
               <div style={{paddingTop:22}}>
                   <Btn
                       title={"新建"}
                       icon={<PlusOutlined/>}
                       onClick={addAuth ? goUrl:null}
                       type={addAuth ? "link" : "link-disabled"}
                   />
               </div>
           </Space>
       </>
    )

    /**
     * 服务地址是否禁用
     * @returns {boolean}
     */
    const serverAddressDisabled = () => {
        const type = formValue?.type
        if(type==='xcode' || type==='xpack' || type==='teston'){
            return version === 'cloud'
        }
        return false
    }

    // 渲染sonar和nexus授权表单
    const server = (
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
                        pattern:/^(https?:\/\/)?[^\s\/]+(\.[^\s\/]+)+(\/[^\s\/]*)*[^\s\/\\.,。，、;:'"?!]$/,
                        message:"请输入正确的服务地址"
                    }
                ]}
            ><Input disabled={serverAddressDisabled()}/>
            </Form.Item>
            <AuthType/>
        </>
    )

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
                        initialValues={{type:type,authPublic:2,authWay:1,authType:1}}
                    >
                        <Form.Item name="type" label="授权类型">
                            {
                                version==='ce'?
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={'gitee'}>Gitee</Select.Option>
                                        <Select.Option value={'github'}>Github</Select.Option>
                                        <Select.Option value={'xcode'}>XCode</Select.Option>
                                        <Select.Option value={'teston'}>TestOn</Select.Option>
                                        <Select.Option value={'sonar'}>Sonar</Select.Option>
                                        <Select.Option value={'nexus'}>Nexus</Select.Option>
                                        <Select.Option value={'xpack'}>XPack</Select.Option>
                                    </Select>
                                    :
                                    <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                        <Select.Option value={'gitee'}>Gitee</Select.Option>
                                        <Select.Option value={'github'}>Github</Select.Option>
                                        <Select.Option value={'sonar'}>Sonar</Select.Option>
                                        <Select.Option value={'nexus'}>Nexus</Select.Option>
                                    </Select>
                            }
                        </Form.Item>
                        <Form.Item name="authPublic" label="服务权限">
                            <Select>
                                <Select.Option value={1}>全局</Select.Option>
                                <Select.Option value={2}>私有</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                        ><Input/>
                        </Form.Item>
                        {
                            (serverWay==='gitee' || serverWay==='github' ) ? authorize : server
                        }
                    </Form>
                </div>
            </Spin>
        </Modals>
    )
}

export default ServerModal
