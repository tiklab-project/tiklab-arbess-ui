import React from "react";
import FormsMirror from "../FormsMirror";
import FormsInput from "../FormsInput";
import FormsTool from "../FormsTool";

/**
 * maven构建
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BuildMaven = props =>{

    return(
        <>
            <FormsTool
                scmType={'jdk'}
            />
            <FormsTool
                scmType={'maven'}
            />
            <FormsInput
                name={"buildAddress"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"模块地址"}
                addonBefore={"/"}
            />

            <FormsMirror
                name={"buildOrder"}
                label={"执行命令"}
                placeholder={"执行命令"}
            />

        </>
    )
}

export default BuildMaven
