import React,{useEffect,useState} from "react";
import {Modal,Form,Input,Select,Tooltip,message,Space} from "antd";
import {PlusOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";
import AuthType from "../../common/authType";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const ServerModal = props =>{

    const {visible,setVisible,createAuthServer,formValue,updateAuthServer,
        findCode,findState,isConfig,type
    } = props

    const [form] = Form.useForm()

    const [isFindState,setIsFindState] = useState(false) // 是否需要查询状态
    const [serverWay,setServerWay] = useState(2) // 授权类型
    const [ban,setBan] = useState(false)
    const [infos,setInfos] = useState("")
    const isMessage = localStorage.getItem("message")
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        visible && renderFormValue(formValue)
    },[visible])
    
    const renderFormValue = formValue => {
        switch (formValue) {
            case "sys":
                form.resetFields()
                setServerWay(2)
                setBan(false)
                break
            case "config":
                form.setFieldsValue({type:type})
                setServerWay(type)
                break
            default:
                form.setFieldsValue(formValue)
                setServerWay(formValue.type)
                setBan(true)
        }
    }

    let interval = null
    useEffect(()=>{
        if(visible && !ban && (serverWay===2 || serverWay===3) ){
            interval = setInterval(()=>findState().then(res=>warn(res.data)),1000)
        }else clearInterval(interval)
        return ()=> clearInterval(interval)
    },[visible,isFindState,serverWay])

    useEffect(()=>{
        autoHeight()
    },[height])

    const autoHeight = () =>{
        let winHeight=0
        if (window.innerHeight)
            winHeight = window.innerHeight-200
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight-200
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight-200
        setHeight(winHeight)
        window.onresize=autoHeight
    }

    const warn = data => {
        if(data === 1){
            clearInterval(interval)
            message.success({content:"授权成功", className:"message"})
        }else if(data === 2){
            message.error({content:"拒绝授权或授权失败", className:"message"})
            clearInterval(interval)
        }
    }

    const changeServerWay = value =>{
        setServerWay(value)
    }

    const onOk = values =>{
        if(formValue==="sys" || formValue==="config"){
            createAuthServer(values).then(res=>{
                remind(res,"添加")
                clearAuthorize()
            })
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

    const onCancel = () =>{
        clearAuthorize()
        setVisible(false)
    }

    // 清除第三方授权
    const clearAuthorize = () =>{
        localStorage.removeItem("code")
        isMessage && localStorage.removeItem("message")
    }

    // 第三方服务授权信息
    const onFocus = () => {
        setInfos(localStorage.getItem("message"))
    }

    // 去第三方授权
    const goUrl = () =>{
        findCode(serverWay).then(res=>{
            res.code===0 && window.open(res.data)
        })
        setIsFindState(true)
        localStorage.setItem("code",serverWay)
    }


    const authorize = (
        <Space>
            <Form.Item
                label="服务授权信息"
                name="message"
                rules={[{required:true,message: "请输入服务连接名" }]}
            >
                <Select
                    style={{width:360}}
                    disabled={ban}
                    onFocus={onFocus}
                >
                    <Select.Option value={infos}>
                        {infos}
                    </Select.Option>
                </Select>
            </Form.Item>
            { !ban &&
                <Btn
                    type={"link"}
                    title={"新建"}
                    icon={<PlusOutlined/>}
                    onClick={goUrl}
                />
            }
        </Space>
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
                rules={[{required:true,message:"请输入服务器地址"}]}

            >
                <Input/>
            </Form.Item>
            <AuthType/>
        </>
    )

    const modalFooter = (
        <>
            <Btn
                onClick={onCancel}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields()
                            onOk(values)
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
            onCancel={onCancel}
            closable={false}
            footer={modalFooter}
            style={{height:height}}
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
                    initialValues={{type:2,authPublic:1,authWay:1,authType:1}}
                >
                    <Form.Item
                        name="type"
                        label="授权类型"
                    >
                        <Select
                            onChange={changeServerWay}
                            disabled={ban||isConfig}
                        >
                            <Select.Option value={2}>gitee</Select.Option>
                            <Select.Option value={3}>github</Select.Option>
                            <Select.Option value={41}>sonar</Select.Option>
                            <Select.Option value={51}>nexus</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{required:true,message:`请输入名称`}]}
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