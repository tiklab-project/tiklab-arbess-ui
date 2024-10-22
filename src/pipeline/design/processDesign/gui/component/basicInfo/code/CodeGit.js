import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

/**
 * Git
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGit = props =>{

    return(
        <>
            <FormsInput
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                isRequire={true}
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

export default CodeGit
