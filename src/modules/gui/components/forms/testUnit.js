import React,{useContext} from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import Mirror from "./mirror";
import TestContext from "../common/testContext";

const TestUnit = props =>{

    const context = useContext(TestContext)

    const {unitShellBlock,setUnitShellBlock} = context.configDataStore

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
                placeholder={"测试命令"}
            />
        </Form.Item>
    )
}

export default observer(TestUnit)