import React,{Fragment,useEffect,useState} from "react";
import {Form,Input,Row} from "antd";
import FindAllProof from "../../../../proof/components/findAllProof";
import AddProofButton from "../../../../proof/components/addProofButton";
import FormTest from "./formTest";
import {inject, observer} from "mobx-react";

const ConfigDeploy = props =>{

    const {configItemStore,configDataStore} = props

    const {formInitialValues} = configDataStore
    const {getFile,profileAddress} = configItemStore

    const [messageInfo,setMessageInfo] = useState("")
    const pipelineName = localStorage.getItem("pipelineName")
    const pipelineId = localStorage.getItem("pipelineId")

    useEffect(()=>{
        const params = {
            pipelineName :pipelineName,
            regex:formInitialValues.deployTargetAddress
        }
        if(formInitialValues.deployTargetAddress){
            getFile(params).then(res=>{
                console.log("linux应用源文件地址",res)
                if(res.code === 0 ){
                    if(res.data ===null){
                        setMessageInfo("null")
                    }else {
                        setMessageInfo("匹配到文件"+res.data)
                    }
                }
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setMessageInfo("")
        }
    },[formInitialValues.deployTargetAddress,pipelineId])

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
        } else if (value< 1) {
            return Promise.reject("最小3000");
        } else if (value > 10000) {
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
                name="deployTargetAddress"
                label="应用源文件地址"
                rules={[{required:true,message:"请输入应用源文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+pipelineName}
                    placeholder="请输入该文件的唯一标识，如:Jar,zip等（支持正则表达式）"
                />
            </Form.Item>
            {renderMessageInfo(messageInfo)}
            <Form.Item
                label="Ip地址"
                name="ip"
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
                name="port"
                rules={[{validator:validate},{required:true,message:"请输入端口号"}]}
            >
                <Input placeholder="输入端口号"/>
            </Form.Item>
            <Row>
                <FindAllProof type={31}/>
                <AddProofButton type={5}/>
                <FormTest />
            </Row>
            <Form.Item
                name="deployAddress"
                label="部署位置"
                rules={[{required:true, message:"请输入部署位置"}]}
            >
                <Input addonBefore={"/"} placeholder="请输入部署位置"/>
            </Form.Item>
            <Form.Item
                className="noRequired"
                name="startOrder"
                label="部署文件命令"
            >
                <Input placeholder="对部署文件的操作命令"/>
            </Form.Item>
            <Form.Item
                className="noRequired"
                name="startAddress"
                label="启动文件地址">
                <Input addonBefore={"/"} placeholder=" / 代表部署位置"/>
            </Form.Item>
        </Fragment>
    )
}

export default inject("configItemStore","configDataStore")(observer(ConfigDeploy))