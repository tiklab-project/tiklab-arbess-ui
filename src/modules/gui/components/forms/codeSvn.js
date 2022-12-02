import React from "react";
import {observer} from "mobx-react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";

const CodeSvn = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                placeholder={"svn地址"}
                label={"svn地址"}
                name={"codeName"}
                dataItem={dataItem}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default observer(CodeSvn)
