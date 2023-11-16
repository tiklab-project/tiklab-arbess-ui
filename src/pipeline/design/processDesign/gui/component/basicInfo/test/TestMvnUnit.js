import React from "react";
import FormsMirror from "../FormsMirror";

/**
 * maven单元测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestMvnUnit = props =>{

    return (
        <FormsMirror
            name={"testOrder"}
            label={"测试命令"}
            placeholder={"测试命令"}
        />
    )
}

export default TestMvnUnit
