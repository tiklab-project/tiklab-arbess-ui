import React from "react";
import Proof from "./proof";
import Inputs from "./inputs";
import {inject,observer} from "mobx-react";

const CodeSvn = props =>{

    const {configDataStore} = props

    const {codeType} = configDataStore

    return(
        <>
            <Inputs
                placeholder={"svn地址"}
                label={"svn地址"}
                name={"codeName"}
                mode={codeType}
                isValid={true}
            />
            <Proof
                allProofType={5}
                testType={"源码地址"}
                type={1}
            />
        </>
    )
}

export default inject("configDataStore")(observer(CodeSvn))
