import React from "react";
import FormsMirror from "../FormsMirror";
import FormsInput from "../FormsInput";

/**
 * maven单元测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestMvnUnit = props =>{

    return (
       <>
           <FormsInput
               name={"address"}
               placeholder={"测试代码地址"}
               label={"测试代码地址"}
               isRequire={true}
           />
           <FormsMirror
               name={"testOrder"}
               label={"测试命令"}
               placeholder={"测试命令"}
           />
       </>
    )
}

export default TestMvnUnit
