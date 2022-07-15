import React,{Fragment} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigDeployLinux = props =>{
  
    const {configDataStore} = props
    const {setIsPrompt,linuxShellBlock,setLinuxShellBlock} = configDataStore

    return(
        <Fragment>
            <Form.Item
                className="noRequired"
                name="startAddress"
                label="启动文件地址">
                <Input addonBefore={"/"} placeholder=" / 代表部署位置"/>
            </Form.Item>
            <Form.Item name="startShell" label="启动命令" className="noRequired">
                <Mirror
                    shellBlock={linuxShellBlock}
                    setShellBlock={setLinuxShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </Fragment>
    )
}

export default inject("configDataStore")(observer(ConfigDeployLinux))


