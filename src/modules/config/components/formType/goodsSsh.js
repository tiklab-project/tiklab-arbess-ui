import React from "react";
import Inputs from "./inputs";
import FindAuth from "./findAuth";

const GoodsSsh = props =>{

    return(
        <>
            <Inputs
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"推送文件"}
                name={"fileAddress"}
                mode={52}
                isValid={true}
            />
            <Inputs
                placeholder={"artifactId"}
                label={"推送位置"}
                name={"putAddress"}
                mode={52}
                isValid={true}
            />
            <FindAuth
                type={52}
            />
        </>
    )
}

export default GoodsSsh