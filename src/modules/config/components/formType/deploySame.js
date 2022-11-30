import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";
import Inputs from "./inputs";
import FindAuth from "./findAuth";

const DeploySame = props =>{

    const {configDataStore,messageInfo} = props

    const {deployType,deployOrderShellBlock,setDeployOrderShellBlock} = configDataStore

    const style = {
        fontSize:13,
        color:"#999",
        paddingLeft:130,
        paddingBottom:10,
        marginTop:-10
    }

    return (
        <>
            <Inputs
                name={"localAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"应用源文件地址"}
                mode={deployType}
                addonBefore={"/"}
            />
            {
                messageInfo && <div style={style}>{messageInfo}</div>
            }
            <FindAuth
                type={deployType}
            />

            <Inputs
                name={"deployAddress"}
                placeholder={"部署位置"}
                label={"部署位置"}
                mode={deployType}
                addonBefore={"/"}
                isValid={true}
            />

            <Form.Item name={"deployOrder"} label={"部署文件命令"}>
                <Mirror
                    name={"deployOrder"}
                    type={deployType}
                    shellBlock={deployOrderShellBlock}
                    setShellBlock={setDeployOrderShellBlock}
                    placeholder={"部署文件命令"}
                />
            </Form.Item>
        </>
    )
}

export default DeploySame