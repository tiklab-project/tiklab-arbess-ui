/**
 * @Description: docker构建
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React from "react";
import FormsInput from "../FormsInput";
import FormsMirror from "../FormsMirror";

const BuildDocker = props => {

    return (
        <>
            <FormsInput
                name={"dockerFile"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"DockerFile文件地址"}
                addonBefore={"/"}
                isRequire={true}
            />
            <FormsMirror
                name={"dockerOrder"}
                label={"构建命令"}
                placeholder={"构建命令"}
                isRequire={true}
            />
        </>
    )
}

export default BuildDocker
