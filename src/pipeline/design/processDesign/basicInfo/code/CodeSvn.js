import React from "react";
import FormsItem from "../FormsItem";
import AuthFind from "../AuthFind";

/**
 * 源码 -- Svn
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeSvn = props =>{

    return(
        <>
            <FormsItem
                name={"codeName"}
                placeholder={"svn地址"}
                label={"svn地址"}
                isValid={true}
            />
            <FormsItem
                name={"svnFile"}
                placeholder={"检出文件夹名称"}
                label={"检出文件"}
            />
            <AuthFind />
        </>
    )
}

export default CodeSvn
