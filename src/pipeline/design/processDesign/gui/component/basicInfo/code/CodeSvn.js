import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";
import FormsTool from "../FormsTool";

/**
 * Svn
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeSvn = props =>{

    return(
        <>
            <FormsTool
                scmType={'svn'}
            />
            <FormsInput
                name={"codeName"}
                placeholder={"Svn仓库地址"}
                label={"Svn仓库地址"}
                isRequire={true}
            />
            <FormsInput
                name={"svnFile"}
                placeholder={"检出文件夹名称"}
                label={"检出文件"}
            />
            <FormsAuth />
        </>
    )
}

export default CodeSvn
