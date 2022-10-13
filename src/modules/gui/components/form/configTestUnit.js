import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";

const ConfigTestUnit = props =>{

    const {configDataStore} = props
    const {setIsPrompt,unitShellBlock,setUnitShellBlock} = configDataStore

    return(
        <Form.Item name="testOrder">
            <Mirror
                shellBlock={unitShellBlock}
                setShellBlock={setUnitShellBlock}
                setIsPrompt={setIsPrompt}
            />
        </Form.Item>
    )
}

export default ConfigTestUnit