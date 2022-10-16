import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const TestUnit = props =>{

    const {configDataStore,configStore,pipelineStore} = props

    const {unitShellBlock,setUnitShellBlock} = configDataStore

    return(
        <Form.Item
            name={"testOrder"}
            label="测试命令"
        >
            <Mirror
                name={"testOrder"}
                type={11}
                pipelineStore={pipelineStore}
                configStore={configStore}
                shellBlock={unitShellBlock}
                setShellBlock={setUnitShellBlock}
            />
        </Form.Item>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(TestUnit))