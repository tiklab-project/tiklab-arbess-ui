import React from "react";
import {observer} from "mobx-react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";

const CodeGitOrGitlab = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                placeholder={"git地址"}
                label={"git地址"}
                name={"codeName"}
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

export default observer(CodeGitOrGitlab)
