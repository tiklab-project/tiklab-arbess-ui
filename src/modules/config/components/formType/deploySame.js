import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";
import Proof from "./proof";
import Inputs from "./inputs";

const DeploySame = props =>{

    const {configDataStore,profileAddress,messageInfo,pipelineName,pipelineStore,configStore} = props

    const {deployType,deployOrderShellBlock,setDeployOrderShellBlock} = configDataStore

    return (
        <>
            <Inputs
                {...props}
                placeholder={"请输入该文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"应用源文件地址"}
                name={"sourceAddress"}
                mode={deployType}
                addonBefore={profileAddress+pipelineName}
            />
            <div className="deployTargetAddress">{messageInfo}</div>
            <Inputs
                {...props}
                placeholder={"输入Ip地址"}
                label={"Ip地址"}
                name={"sshIp"}
                mode={deployType}
            />
            <Inputs
                {...props}
                placeholder={"请输入端口号"}
                label={"端口号"}
                name={"sshPort"}
                mode={deployType}
            />

            <Proof
                allProofType={deployType}
                testType={"Ip地址"}
                type={2}
            />

            <Inputs
                {...props}
                placeholder={"请输入部署位置"}
                label={"部署位置"}
                name={"deployAddress"}
                mode={deployType}
                addonBefore={"/"}
            />

            <Form.Item
                name={"deployOrder"}
                label={"部署文件命令"}
            >
                <Mirror
                    name={"deployOrder"}
                    type={deployType}
                    pipelineStore={pipelineStore}
                    shellBlock={deployOrderShellBlock}
                    setShellBlock={setDeployOrderShellBlock}
                    configStore={configStore}
                    placeholder={"请输入部署文件命令"}
                />
            </Form.Item>
        </>
    )
}

export default DeploySame