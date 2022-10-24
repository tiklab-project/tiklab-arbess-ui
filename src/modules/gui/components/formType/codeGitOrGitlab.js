import React,{useContext} from "react";
import {observer} from "mobx-react";
import Inputs from "./inputs";
import Proof from "./proof";
import TestContext from "../common/testContext";

const CodeGitOrGitlab = props =>{

    const context = useContext(TestContext)

    const {codeType} = context.configDataStore

    return(
        <>
            <Inputs
                placeholder={"请输入git地址"}
                label={"git地址"}
                name={"codeName"}
                mode={codeType}
            />
            <Inputs
                placeholder={"请输入分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
                mode={codeType}
            />
            <Proof
                allProofType={codeType}
                testType={"源码地址"}
            />
        </>
    )
}

export default observer(CodeGitOrGitlab)
