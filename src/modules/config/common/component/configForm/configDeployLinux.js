import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigDeployLinux = props =>{
  
    const {configDataStore} = props
    const {setIsPrompt,linuxShellBlock,setLinuxShellBlock} = configDataStore

    return(
        <Form.Item name="deployShell" label="启动命令" className="noRequired">
            <Mirror
                shellBlock={linuxShellBlock}
                setShellBlock={setLinuxShellBlock}
                setIsPrompt={setIsPrompt}
            />
        </Form.Item>
    )
}

export default inject("configDataStore")(observer(ConfigDeployLinux))


