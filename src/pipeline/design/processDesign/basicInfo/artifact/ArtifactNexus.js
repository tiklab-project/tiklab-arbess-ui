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
            {/*/>*/}
            <AuthFind/>
        </>
    )
}

export default ArtifactNexus
