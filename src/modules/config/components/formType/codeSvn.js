import React from "react";
import Proof from "./proof";
import Inputs from "./inputs";

const CodeSvn = props =>{

    const {codeType} = props

    return(
        <>
            <Inputs
                {...props}
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

export default CodeSvn
