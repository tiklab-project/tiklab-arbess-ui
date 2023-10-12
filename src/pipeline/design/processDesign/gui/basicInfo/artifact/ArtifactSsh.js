import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

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
                name={"putAddress"}
                placeholder={"推送位置"}
                label={"推送位置"}
                isValid={true}
            />
            <FormsAuth />
        </>
    )
}

export default ArtifactSsh
