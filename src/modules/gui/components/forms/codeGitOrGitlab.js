import React,{useContext} from "react";
import {observer} from "mobx-react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";
import TestContext from "../common/testContext";

const CodeGitOrGitlab = props =>{

    const context = useContext(TestContext)

    const {codeType} = context.configDataStore

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

export default observer(CodeGitOrGitlab)
