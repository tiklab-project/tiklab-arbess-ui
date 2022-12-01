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
                name={"codeName"}
                placeholder={"svn地址"}
                label={"svn地址"}
                mode={codeType}
                isValid={true}
            />
            <Inputs
                name={"svnFile"}
                placeholder={"检出文件夹名称"}
                label={"检出文件"}
                mode={codeType}
            />
            <FindAuth
                type={5}
            />
        </>
    )
}

export default inject("configDataStore")(observer(CodeSvn))
