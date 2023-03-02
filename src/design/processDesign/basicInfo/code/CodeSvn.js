import React from "react";
import Inputs from "../Inputs";
import FindAuth from "../FindAuth";

/**
 * 源码 -- Svn
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeSvn = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                name={"codeName"}
                placeholder={"svn地址"}
                label={"svn地址"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                name={"svnFile"}
                placeholder={"检出文件夹名称"}
                label={"检出文件"}
                dataItem={dataItem}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default CodeSvn
