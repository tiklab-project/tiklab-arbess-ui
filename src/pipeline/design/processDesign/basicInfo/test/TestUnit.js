import React from "react";
import {Form} from "antd";
import Mirror from "../CodeBlock";

/**
 * 测试 -- 单元测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestUnit = props =>{

    return(
        <Form.Item name={"testOrder"} label="测试命令">
            <Mirror
                name={"testOrder"}
                placeholder={"测试命令"}
            />
        </Form.Item>
    )
}

export default TestUnit
