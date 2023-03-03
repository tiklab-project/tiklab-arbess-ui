import React from "react";
import FormsItem from "../FormsItem";
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
            <FormsItem
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                isValid={true}
            />
            <FormsItem
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                isValid={true}
            />
            <FormsItem
                name={"version"}
                placeholder={"version"}
                label={"version"}
                isValid={true}
            />
            <FormsItem
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                isValid={true}
            />
            <FormsItem
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
