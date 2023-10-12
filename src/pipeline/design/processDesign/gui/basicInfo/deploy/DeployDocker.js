import React from "react";
import FormsMirror from "../FormsMirror";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

/**
 * docker部署
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployDocker = props =>{

    return(
        <>
            <FormsAuth />
            <FormsInput
                name={"deployAddress"}
                placeholder={"部署位置"}
                label={"部署位置"}
                addonBefore={"/"}
                isValid={true}
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
