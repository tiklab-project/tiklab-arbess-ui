import React,{useEffect,useState} from "react";
import {Modal,Form,Input,Select,Tooltip,message,Space} from "antd";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import AuthType from "../../common/authType";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";

const ServerModal = props =>{

    const {visible,setVisible,createAuthServer,formValue,updateAuthServer,callUrl,
        findCode,isConfig,type,findAccessToken
    } = props

    const [form] = Form.useForm()

    const [serverWay,setServerWay] = useState(2) // 授权类型
    const [ban,setBan] = useState(false) // 禁用一部分表单
    const [infos,setInfos] = useState("") // 授权信息
    const [addAuth,setAddAuth] = useState(false)  // 去第三方授权按钮是否禁用
    const [height,setHeight] = useState(0)

    const [callUrlWarn,setCallUrlWarn] = useState("")
    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        visible && renderFormValue(formValue)
        return ()=>form.resetFields()
    },[visible])

    const renderFormValue = formValue => {
        switch (formValue) {
            case "sys":
                form.setFieldsValue({type:2})
                setServerWay(2)
                setInfos("")
                setBan(false)
                break
            case "config":
                form.setFieldsValue({type:type})
                setServerWay(type)
                setInfos("")
                break
            default:
                form.setFieldsValue(formValue)
                setBan(true)
        }
    }


    useEffect(()=>{
        visible && isAddAuth()
        visible && window.addEventListener("storage", rightCartData)
        return () => {
            window.removeEventListener("storage", rightCartData)
        }
    },[visible,serverWay,fresh])

    const rightCartData = () =>{
        let codeValue = localStorage.getItem("codeValue");
        if(codeValue!==null) {
            if (codeValue==="false"){
                message.info("拒绝授权或授权失败")
            }else{
                const params = {
                    type:serverWay,
                    clientId:form && form.getFieldValue("clientId"),
                    clientSecret:form && form.getFieldValue("clientSecret"),
                    callbackUrl:form && form.getFieldValue("callbackUrl"),
                    code:codeValue
                }
                findAccessToken(params).then(res=>{
                    if(res.code===0){
                        message.success("授权成功")
                        setInfos(res.data)
                    }
                })
            }
            localStorage.removeItem("codeValue")
        }
    }

    const validCallbackUrl = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/

    const isAddAuth = () => {
        let clientId = form && form.getFieldValue("clientId")
        let clientSecret = form && form.getFieldValue("clientSecret")
        let callbackUrl = form && form.getFieldValue("callbackUrl")
        if (isNull(clientId) || isNull(clientSecret) || isNull(callbackUrl) || !validCallbackUrl.test(callbackUrl)) {
            setAddAuth(false)
        } else {
            setAddAuth(true)
        }
    }

    const isNull = values => values === null || values === "" || values === " " || values === undefined

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
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    // 改变授权类型
    const changeServerWay = value =>{
        setServerWay(value)
    }

    const onOk = values =>{
        if(formValue==="sys" || formValue==="config"){
            createAuthServer(values).then(res=>{
                remind(res,"添加")
            })
            setInfos("")
        }else {
            const param = {
                serverId:formValue.serverId,
                name:values.name,
                type:values.type,
                authPublic:values.authPublic,
                authType:values.authType,
                username:values.username,
                password:values.password,
                message:values.message,
                privateKey:values.privateKey,
                serverAddress:values.serverAddress,
                clientId:values.clientId,
                clientSecret:values.clientSecret,
                callbackUrl:values.callbackUrl,
            }
            updateAuthServer(param).then(res=>{
                remind(res,"修改")
            })
        }
        setVisible(false)
    }
    
    const remind = (data,info) => {
        if(data.code===0){
            message.info(`${info}成功`)
        }
    }

    // 去第三方授权
    const goUrl = way =>{
        const params = {
            type:way,
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
           <Form.Item label="授权id" name="clientId"
                      rules={[{required:true,message:`授权id不能空`}]}
           >
               <Input/>
           </Form.Item>
           <Form.Item label="授权密码" name="clientSecret"
                      rules={[{required:true,message:`授权密码不能空`}]}
           >
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
           >
               <Input/>
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
               <Form.Item name="message" label="服务授权信息"
                          rules={[{required:true,message: "服务授权信息不能空" }]}
               >
                   <Select style={{width:360}}>
                       <Select.Option value={infos}>
                           {infos}
                       </Select.Option>
                   </Select>
               </Form.Item>
               <div style={{paddingTop:22}}>
                   <Btn
                       title={"新建"}
                       icon={<PlusOutlined/>}
                       onClick={addAuth ? ()=>goUrl(serverWay):null}
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

            >
                <Input/>
            </Form.Item>
            <AuthType/>
        </>
    )

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            onOk(values)
                            form.resetFields()
                        })
                }}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    const modalTitle = () =>{
        if(formValue==="sys" || formValue==="config"){
            return "添加"
        }
        return "修改"
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            className="mf"

        >
            <ModalTitle
                setVisible={setVisible}
                title={modalTitle()}
            />
            <div style={{maxHeight:"calc(100% - 120px)",overflow:"auto"}}>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onValuesChange={onValuesChange}
                    initialValues={{type:serverWay,authPublic:1,authWay:1,authType:1}}
                >
                    <Form.Item
                        name="type"
                        label="授权类型"
                    >
                        <Select
                            onChange={changeServerWay}
                            disabled={ban||isConfig}
                        >
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
                        rules={[{required:true,message:`名称不能空`}]}
                    >
                        <Input/>
                    </Form.Item>
                    {
                        (serverWay===3 || serverWay===2) && authorize
                    }
                    {
                        (serverWay===41 || serverWay===51) && server
                    }
                </Form>
            </div>
        </Modal>
    )
}

export default ServerModal