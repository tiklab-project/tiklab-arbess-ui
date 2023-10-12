import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

/**
 * Git & Gitlab
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGitOrGitlab = props =>{

    return(
        <>
            <FormsInput
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                isValid={true}
            />
            <FormsInput
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
            />
            <FormsAuth />
        </>
    )
}

export default CodeGitOrGitlab
