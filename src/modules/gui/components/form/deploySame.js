import React from "react";
import {Form,Input} from "antd";
import Mirror from "./mirror";
import ConfigProof from "./configProof";


const DeploySame = props =>{

    const {configDataStore,profileAddress,messageInfo,pipelineName} = props

    const {setIsPrompt,deployType,virOrderShellBlock,setVirOrderShellBlock,docOrderShellBlock,setDocOrderShellBlock} = configDataStore

    const portValidator = (rule,value) =>{
        if (!value) {
            return Promise.resolve()
        } else if (value< 1) {
            return Promise.reject("最小3000")
        } else if (value > 30000) {
            return Promise.reject("最大30000")
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字")
        } else {
            return Promise.resolve() //验证通过
        }
    }


    return (
        <>
            <Form.Item
                name={deployType+"sourceAddress"}
                label="应用源文件地址"
                rules={[{required:true,message:"请输入应用源文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+pipelineName}
                    placeholder="请输入该文件的唯一标识，如:Jar,zip等（支持正则表达式）"
                />
            </Form.Item>
            <div className="deployTargetAddress">{messageInfo}</div>
            <Form.Item
                label="Ip地址"
                name={deployType+"sshIp"}
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
                name={deployType+"sshPort"}

                rules={[{validator:portValidator},{required:true,message:"请输入端口号"}]}
            >
                <Input placeholder="输入端口号"/>
            </Form.Item>
            <ConfigProof
                {...props}
                allProofType={deployType}
                testType={"Ip地址"}
                configDataStore={configDataStore}
            />
            <Form.Item
                name={deployType+"deployAddress"}
                label="部署位置"
                rules={[{required:true, message:"请输入部署位置"}]}
            >
                <Input addonBefore={"/"} placeholder="请输入部署位置"/>
            </Form.Item>
            <Form.Item
                name={deployType+"deployOrder"}
                label="部署文件命令">
                <Mirror
                    shellBlock={deployType==31?virOrderShellBlock:docOrderShellBlock}
                    setShellBlock={deployType==31?setVirOrderShellBlock:setDocOrderShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </>
    )
}

export default DeploySame