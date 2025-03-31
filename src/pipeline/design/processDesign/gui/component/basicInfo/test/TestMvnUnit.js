/**
 * @Description: maven单元测试
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React from "react";
import FormsMirror from "../FormsMirror";
import FormsInput from "../FormsInput";
import FormsTool from "../FormsTool";
import {toolJdk, toolMaven} from "../../../../../../../common/utils/Constant";

const TestMvnUnit = props =>{

    return (
       <>
           <FormsTool
               scmType={toolJdk}
           />
           <FormsTool
               scmType={toolMaven}
           />
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
