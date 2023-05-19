import React from "react";
import FormsItem from "../FormsItem";
import AuthFind from "../AuthFind";

/**
 * Git & Gitlab
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGitOrGitlab = props =>{

    return(
        <>
            <FormsItem
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                isValid={true}
            />
            <FormsItem
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
            />
            <AuthFind/>
        </>
    )
}

export default CodeGitOrGitlab
