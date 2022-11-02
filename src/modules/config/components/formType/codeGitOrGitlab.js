import React from "react";
import {inject,observer} from "mobx-react";
import Inputs from "./inputs";
import Proof from "./proof";

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
                isValid={true}
            />
            <Inputs
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
                mode={codeType}
            />
            <Proof
                allProofType={codeType}
                testType={"源码地址"}
                type={0}
            />
        </>
    )
}

export default inject("configDataStore")(observer(CodeGitOrGitlab))
