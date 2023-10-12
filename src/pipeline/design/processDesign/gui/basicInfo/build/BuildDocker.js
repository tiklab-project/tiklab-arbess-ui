import React from "react";
import FormsInput from "../FormsInput";
import FormsMirror from "../FormsMirror";

/**
 * docker构建
 * @param props
 * @constructor
 */
const BuildDocker = props => {

    return (
        <>
            <FormsInput
                name={"dockerName"}
                placeholder={`镜像名称`}
                label={"镜像名称"}
                isValid={true}
            />
            <FormsInput
                name={"dockerVersion"}
                placeholder={`镜像版本，默认latest`}
                label={"镜像版本"}
            />
            <FormsInput
                name={"dockerFile"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"DockerFile文件地址"}
                addonBefore={"/"}
            />
            <FormsMirror
                name={"dockerOrder"}
                label={"构建命令"}
                placeholder={"构建命令"}
                isValid={true}
            />
        </>
    )
}

export default BuildDocker