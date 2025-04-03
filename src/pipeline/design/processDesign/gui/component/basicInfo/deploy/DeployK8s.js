import React from "react";
import FormsMirror from "../FormsMirror";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

/**
 * k8s部署
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployK8s = props =>{

    return(
        <>
            <FormsAuth />
            <FormsInput
                name={"k8sNamespace"}
                placeholder={"命名空间"}
                label={"命名空间"}
                isRequire={true}
            />
            <FormsMirror
                name={"k8sJson"}
                label={"配置文件"}
                placeholder={"配置文件"}
                isRequire={true}
                language={'yaml'}
            />
        </>
    )
}

export default DeployK8s
