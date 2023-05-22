import React from "react";
import FormsInput from "../FormsInput";
import AuthFind from "../AuthFind";

/**
 * Svn
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeSvn = props =>{

    return(
        <>
            <FormsInput
                name={"codeName"}
                placeholder={"svn地址"}
                label={"svn地址"}
                isValid={true}
            />
            <FormsInput
                name={"svnFile"}
                placeholder={"检出文件夹名称"}
                label={"检出文件"}
            />
            <AuthFind />
        </>
    )
}

export default CodeSvn
