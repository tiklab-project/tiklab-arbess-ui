import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";
import FormsTool from "../FormsTool";

/**
 * Git
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGit = props =>{

    return(
        <>
            <FormsTool
                scmType={'git'}
            />
            <FormsInput
                placeholder={"Git仓库地址"}
                label={"Git仓库地址"}
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
