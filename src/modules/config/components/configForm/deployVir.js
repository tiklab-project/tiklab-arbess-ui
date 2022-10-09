import React from "react";
import {Form,Input} from "antd";
import Mirror from "./mirror";


const DeployVir = props =>{

    const {configDataStore} = props
    const {virShellBlock,setVirShellBlock,setIsPrompt,deployType} = configDataStore
    
    return(
        <>
            <Form.Item name={deployType+"startAddress"} label="启动文件地址">
                <Input addonBefore={"/"} placeholder=" / 启动文件地址"/>
            </Form.Item>
            <Form.Item name="startShell" label="启动命令" className="noRequired">
                <Mirror
                    shellBlock={virShellBlock}
                    setShellBlock={setVirShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </>
    )
}

export default DeployVir