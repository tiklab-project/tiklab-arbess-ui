import React from "react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";

const GoodsSsh = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"推送文件"}
                name={"fileAddress"}
                dataItem={dataItem}
                isValid={true}
            />
            <Inputs
                placeholder={"artifactId"}
                label={"推送位置"}
                name={"putAddress"}
                dataItem={dataItem}
                isValid={true}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default GoodsSsh