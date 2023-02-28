import React from "react";
import Inputs from "../Inputs";
import FindAuth from "../FindAuth";

/**
 * 源码 -- Git && Gitlab
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGitOrGitlab = props =>{

    const {dataItem}=props

    return(
        <>
            <Inputs
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
                dataItem={dataItem}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default CodeGitOrGitlab
