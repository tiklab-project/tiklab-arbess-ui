import React from "react";
import Inputs from "./inputs";
import FindAuth from "./findAuth";

const GoodsSsh = props =>{

    return(
        <>
            <Inputs
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"推送文件"}
                mode={52}
                isValid={true}
            />
            <Inputs
                name={"putAddress"}
                placeholder={"推送位置"}
                label={"推送位置"}
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