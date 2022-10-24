import React,{useContext} from "react";
import {observer} from "mobx-react";
import Proof from "./proof";
import Inputs from "./inputs";
import TestContext from "../common/testContext";

const CodeSvn = props =>{

    const context = useContext(TestContext)

    const {codeType} = context.configDataStore

    return(
        <>
            <Inputs
                placeholder={"请输入svn地址"}
                label={"svn地址"}
                name={"codeName"}
                mode={codeType}
            />
            <Proof
                allProofType={5}
                testType={"源码地址"}
            />
        </>
    )
}

export default observer(CodeSvn)
