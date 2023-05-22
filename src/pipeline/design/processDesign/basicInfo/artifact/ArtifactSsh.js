import React from "react";
import FormsInput from "../FormsInput";
import AuthFind from "../AuthFind";

/**
 * 制品--Ssh
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ArtifactSsh = props =>{

    return(
        <>
            <FormsInput
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"推送文件"}
                isValid={true}

            />
            <FormsInput
                name={"putAddress"}
                placeholder={"推送位置"}
                label={"推送位置"}
                isValid={true}
            />
            <AuthFind/>
        </>
    )
}

export default ArtifactSsh
