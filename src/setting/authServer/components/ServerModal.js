import React,{useEffect,useState } from "react";
import {Modal,Form,Input,Select,Tooltip,message,Space} from "antd";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import AuthType from "../../authCommon/AuthType";
import ModalTitle from "../../../common/modalTitle/ModalTitle";
import {autoHeight,Validation} from "../../../common/client/Client";
import {ServerLoading} from "../../../common/loading/Loading";

const ServerModal = props =>{

    const {visible,setVisible,createAuthServer,formValue,updateAuthServer,callUrl,findCode,
        isConfig,type,findAccessToken,skin
    } = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    const [serverWay,setServerWay] = useState(2) // 授权类型
    const [addAuth,setAddAuth] = useState(false)  // 去第三方授权按钮是否禁用
    const [fresh,setFresh] = useState(false)
    const [infos,setInfos] = useState("") // 授权信息
    const [callUrlWarn,setCallUrlWarn] = useState("") // 回调地址


    useEffect(()=>{
        visible && renderFormValue(formValue)
        return ()=> setInfos("")
    },[visible])

    const renderFormValue = formValue => {
        if(formValue){
            form.setFieldsValue(formValue)
            setServerWay(formValue.type)
            return
        }
        form.resetFields()
        setServerWay(type)
        setCallUrlWarn("")
    }

    useEffect(()=>{
        visible && window.addEventListener("storage", authorisation)
        return () => {
            window.removeEventListener("storage", authorisation)
        }
    },[visible,serverWay])

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

    // 是否能够去授权
    useEffect(()=>{
        visible && setAuth()
    },[visible,serverWay,fresh])

    const validCallbackUrl = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/
    const isNull = values => values === null || values === "" || values === " " || values === undefined

    // 是否能够新建
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

    const onValuesChange = value => {
        if(value.clientId || value.clientId===""){
            setFresh(!fresh)
        }
        if(value.clientSecret || value.clientSecret===""){
            setFresh(!fresh)
        }
        if(value.callbackUrl || value.callbackUrl===""){
            setFresh(!fresh)
            callUrl(value.callbackUrl).then(res=>{
                res.code===0 && setCallUrlWarn(res.data)
            })
        }
    }

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    // 改变授权类型
    const changeServerWay = value =>{
        setServerWay(value)
    }

    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue){
                const param = {
                    serverId:formValue.serverId,
                    ...values,
                }
                updateAuthServer(param)
            }else {
                createAuthServer(values)
            }
            setVisible(false)
        })
    }

    // 去第三方授权
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

    const authorize = (
       <>
           <Form.Item label="授权id" name="clientId" rules={[{required:true,message:`授权id不能空`}]}>
               <Input/>
           </Form.Item>
           <Form.Item label="授权密码" name="clientSecret" rules={[{required:true,message:`授权密码不能空`}]}>
               <Input/>
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
           ><Input/>
           </Form.Item>
           {
               callUrlWarn &&
               <div style={{
                   marginTop:-10,
                   fontSize:13,
                   color:"#999",
                   paddingBottom:10,
               }}>将下方地址设置为应用{serverWay===2?"Gitee":"Github"}回调地址{callUrlWarn}</div>
           }
           <Space>
               <Form.Item name="message" label="服务授权信息" rules={[{required:true,message: "服务授权信息不能空" }]}>
                   <Select style={{width:360}}>
                       <Select.Option value={infos}>{infos}</Select.Option>
                   </Select>
               </Form.Item>
               <div style={{paddingTop:22}}>
                   <Btn
                       title={"新建"}
                       icon={<PlusOutlined/>}
                       onClick={addAuth ? ()=>goUrl():null}
                       type={addAuth ? "link" : "link-disabled"}
                   />
               </div>
           </Space>
       </>
    )

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
                rules={[{required:true,message:"服务器地址不能空"}]}

            ><Input/>
            </Form.Item>
            <AuthType/>
        </>
    )

    const modalFooter = (
        <>
            <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
            <Btn onClick={onOk} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            destroyOnClose={true}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="resources-modal">
                <div className="resources-modal-up">
                    <ModalTitle setVisible={setVisible} title={formValue?"修改":"添加"}/>
                </div>
                <div className="resources-modal-content">
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        onValuesChange={onValuesChange}
                        initialValues={{type:serverWay,authPublic:1,authWay:1,authType:1}}
                    >
                        <Form.Item name="type" label="授权类型">
                            <Select onChange={changeServerWay} disabled={formValue || isConfig}>
                                <Select.Option value={2}>Gitee</Select.Option>
                                <Select.Option value={3}>Github</Select.Option>
                                <Select.Option value={41}>sonar</Select.Option>
                                <Select.Option value={51}>nexus</Select.Option>
                            </Select>
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
                            (serverWay===3 || serverWay===2) && authorize
                        }
                        {
                            (serverWay===41 || serverWay===51) && server
                        }
                    </Form>
                </div>
                {
                    skin && <ServerLoading title={'授权中……'}/>
                }
            </div>
        </Modal>
    )
}

export default ServerModal
