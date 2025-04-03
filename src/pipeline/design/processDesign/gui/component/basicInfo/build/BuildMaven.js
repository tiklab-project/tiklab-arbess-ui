/**
 * @Description: maven构建
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
import {observer} from "mobx-react";

const BuildMaven = props =>{

    return(
        <>
            <FormsTool
                scmType={toolJdk}
            />
            <FormsTool
                scmType={toolMaven}
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

export default observer(BuildMaven)
