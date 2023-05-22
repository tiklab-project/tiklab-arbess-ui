import React from "react";
import FormsInput from "../FormsInput";
import AuthFind from "../AuthFind";

/**
 * 制品--nexus
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ArtifactNexus = props => {

    return(
        <>
            <FormsInput
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                isValid={true}
            />
            <FormsInput
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                isValid={true}
            />
            <FormsInput
                name={"version"}
                placeholder={"version"}
                label={"version"}
                isValid={true}
            />
            <FormsInput
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                isValid={true}
            />
            <FormsInput
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                isValid={true}
            />
            <AuthFind/>
        </>
    )
}

export default ArtifactNexus
