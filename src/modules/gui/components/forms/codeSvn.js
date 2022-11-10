import React,{useContext} from "react";
import {observer} from "mobx-react";
import Inputs from "./inputs";
import TestContext from "../common/testContext";
import FindAuth from "../auth/findAuth";

const CodeSvn = props =>{

    const context = useContext(TestContext)

    const {codeType} = context.configDataStore

    return(
        <>
            <Inputs
                placeholder={"svn地址"}
                label={"svn地址"}
                name={"codeName"}
                mode={codeType}
            />
            <FindAuth
                type={codeType}
            />
        </>
    )
}

export default observer(CodeSvn)
