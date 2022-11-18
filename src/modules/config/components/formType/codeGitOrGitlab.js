import React from "react";
import {inject,observer} from "mobx-react";
import Inputs from "./inputs";
import FindAuth from "./findAuth";

const CodeGitOrGitlab = props =>{

    const {configDataStore}=props
    const {codeType} = configDataStore

    return(
        <>
            <Inputs
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                mode={codeType}
            />
            <Inputs
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
                mode={codeType}
            />
            <FindAuth
                type={codeType}
            />
        </>
    )
}

export default inject("configDataStore")(observer(CodeGitOrGitlab))
