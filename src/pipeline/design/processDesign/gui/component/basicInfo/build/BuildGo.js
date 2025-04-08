/**
 * @Description: go构建
 * @Author: gaomengyuan
 * @Date: 2025/4/8
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/8
 */
import React from "react";
import FormsInput from "../FormsInput";
import FormsMirror from "../FormsMirror";
import {toolGo} from "../../../../../../../common/utils/Constant";
import FormsTool from "../FormsTool";

const BuildGo = () => {

    return (
        <>
            <FormsTool
                scmType={toolGo}
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

export default BuildGo
