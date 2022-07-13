import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigDeployShell = props =>{

    const {configDataStore} = props

    const {shellBlock,setLinuxShellBlock,setIsPrompt} = configDataStore

    return(
        <Form.Item name="deployShell" label="Shell命令">
            <Mirror
                shellBlock={shellBlock}
                setShellBlock={setLinuxShellBlock}
                setIsPrompt={setIsPrompt}
            />
        </Form.Item>
    )
}

export default inject("configDataStore")(observer(ConfigDeployShell))