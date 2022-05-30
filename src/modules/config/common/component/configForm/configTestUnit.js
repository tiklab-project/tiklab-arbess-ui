import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";


const ConfigTestUnit = props =>{

    const {configDataStore} = props
    const {setIsPrompt,unitShellBlock,setUnitShellBlock} = configDataStore

    return(
        <Form.Item name="testOrder">
            <Mirror
                autoSize
                shellBlock={unitShellBlock}
                setShellBlock={setUnitShellBlock}
                setIsPrompt={setIsPrompt}
            />
        </Form.Item>
    )
}

export default inject('configDataStore')(observer(ConfigTestUnit))