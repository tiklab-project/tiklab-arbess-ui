import React from "react";
import {Form} from "antd";
import Mirror from "../CodeBlock";

/**
 * maven单元测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestMvnUnit = props =>{

    return (
        <Form.Item name={"testOrder"} label="测试命令">
            <Mirror
                name={"testOrder"}
                placeholder={"测试命令"}
            />
        </Form.Item>
    )
}

export default TestMvnUnit
