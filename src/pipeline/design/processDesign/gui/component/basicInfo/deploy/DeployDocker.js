/**
 * @Description: docker部署
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/16
 */
import React from "react";
import FormsMirror from "../FormsMirror";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

const DeployDocker = props =>{

    return(
        <>
            <FormsAuth />
            <FormsInput
                name={"dockerImage"}
                placeholder={"部署镜像名称"}
                label={"部署镜像名称"}
                isRequire={true}
            />
            <FormsInput
                name={"deployAddress"}
                placeholder={"部署位置"}
                label={"部署位置"}
                addonBefore={"/"}
                isRequire={true}
            />
            <FormsMirror
                name={"deployOrder"}
                label={"启动命令"}
                placeholder={"启动命令"}
            />
        </>
    )
}

export default DeployDocker
