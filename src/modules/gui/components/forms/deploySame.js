import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";

const DeploySame = props =>{

    const {configdatastore,messageinfo} = props

    const {deployType,deployOrderShellBlock,setDeployOrderShellBlock} = configdatastore

    return (
        <>
            <Inputs
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"应用源文件地址"}
                name={"localAddress"}
                mode={deployType}
                addonbefore={"/"}
            />

            <div className="deployTargetAddress">{messageinfo}</div>

            <FindAuth
                type={deployType}
            />

            <Inputs
                placeholder={"部署位置"}
                label={"部署位置"}
                name={"deployAddress"}
                mode={deployType}
                addonbefore={"/"}
                isValid={true}
            />

            <Form.Item
                name={"deployOrder"}
                label={"部署文件命令"}
            >
                <Mirror
                    name={"deployOrder"}
                    type={deployType}
                    shellBlock={deployOrderShellBlock}
                    setShellBlock={setDeployOrderShellBlock}
                />
            </Form.Item>
        </>
    )
}

export default DeploySame