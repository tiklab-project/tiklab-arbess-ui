import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigDeployShell = props =>{

    const {configDataStore} = props
    const {shellBlock,setShellBlock,setIsPrompt} = configDataStore

    return(
        <Form.Item name="startShell" label="Shell命令" className="noRequired">
            <Mirror
                shellBlock={shellBlock}
                setShellBlock={setShellBlock}
                setIsPrompt={setIsPrompt}
            />
        </Form.Item>
    )
}

export default inject("configDataStore")(observer(ConfigDeployShell))