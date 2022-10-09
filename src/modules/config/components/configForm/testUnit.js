import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const TestUnit = props =>{

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

export default inject("configDataStore")(observer(TestUnit))