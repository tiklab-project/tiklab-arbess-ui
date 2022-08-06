import React,{Fragment,useEffect,useState} from "react";
import ConfigProof from "./configProof";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigDeploy = props =>{

    const {configItemStore,configDataStore,matFlowStore} = props

    const {formInitialValues,setIsPrompt,orderShellBlock,setOrderShellBlock} = configDataStore
    const {fileAddress,getFile,profileAddress} = configItemStore
    const {matFlowId,matFlowName} = matFlowStore

    const [messageInfo,setMessageInfo] = useState("")

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[matFlowId])

    useEffect(()=>{
        fileAddress()
    },[])

    useEffect(()=>{
        const params = {
            matFlowName:matFlowName,
            regex:formInitialValues.sourceAddress
        }
        if(formInitialValues.sourceAddress && matFlowId){
            getFile(params).then(res=>{
                addMessageInfo(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setMessageInfo("")
        }
    },[formInitialValues.sourceAddress,matFlowId])
    
    const addMessageInfo = data => {
        if(data.code === 0 ){
            if(data.data === null){
                setMessageInfo("null")
            }else {
                setMessageInfo("匹配到文件"+data.data)
            }
        }
    }

    const renderMessageInfo = messageInfo => {
        switch (messageInfo) {
            case "null":
                return <div className="deployTargetAddress deployTargetAddress-null">无法匹配到文件或者匹配多个文件</div>
            default:
                return <div className="deployTargetAddress deployTargetAddress-exist">{messageInfo}</div>
        }
    }

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value < 1) {
            return Promise.reject("最小1");
        } else if (value > 30000) {
            return Promise.reject("最大30000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
    }

    return(
        <Fragment>
            <Form.Item
                name="sourceAddress"
                label="应用源文件地址"
                rules={[{required:true,message:"请输入应用源文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+matFlowName}
                    placeholder="请输入该文件的唯一标识，如:Jar,zip等（支持正则表达式）"
                />
            </Form.Item>
            { renderMessageInfo(messageInfo) }
            <Form.Item
                label="Ip地址"
                name="sshIp"
                rules={[
                    {required:true, message:"输入Ip地址"},
                    {
                        pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                        message:"请输入正确的Ip地址"
                    },
                ]}
            >
                <Input placeholder="输入Ip地址"/>
            </Form.Item>
            <Form.Item
                label="端口号"
                name="sshPort"
                rules={[{validator:validate},{required:true,message:"请输入端口号"}]}
            >
                <Input placeholder="输入端口号"/>
            </Form.Item>
            <ConfigProof
                allProofType={31}
                proofBtnType={5}
                testType={"Ip地址"}
            />
            <Form.Item
                name="deployAddress"
                label="部署位置"
                rules={[{required:true, message:"请输入部署位置"}]}
            >
                <Input addonBefore={"/"} placeholder="请输入部署位置"/>
            </Form.Item>
            <Form.Item
                className="noRequired"
                name="deployOrder"
                label="部署文件命令"
            >
                <Mirror
                    shellBlock={orderShellBlock}
                    setShellBlock={setOrderShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </Fragment>
    )
}

export default inject("configItemStore","configDataStore","matFlowStore")(observer(ConfigDeploy))