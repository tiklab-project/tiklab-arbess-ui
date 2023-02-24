import React from "react";
import Inputs from "../basic/inputs";
import FindAuth from "../basic/findAuth";

const CodeGitOrGitlab = props =>{

    const {dataItem}=props

    return(
        <>
            <Inputs
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
                dataItem={dataItem}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default CodeGitOrGitlab
