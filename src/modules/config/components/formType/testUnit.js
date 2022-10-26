import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const TestUnit = props =>{

    const {configDataStore} = props

    const {unitShellBlock,setUnitShellBlock} = configDataStore

    return(
        <Form.Item
            name={"testOrder"}
            label="测试命令"
        >
            <Mirror
                name={"testOrder"}
                type={11}
                shellBlock={unitShellBlock}
                setShellBlock={setUnitShellBlock}
                placeholder={"请输入测试命令"}
            />
        </Form.Item>
    )
}

export default inject("configDataStore")(observer(TestUnit))