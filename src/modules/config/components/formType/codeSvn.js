import React from "react";
import Inputs from "./inputs";
import {inject,observer} from "mobx-react";
import FindAuth from "./findAuth";

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
            <FindAuth
                type={codeType}
            />
        </>
    )
}

export default inject("configDataStore")(observer(CodeSvn))
