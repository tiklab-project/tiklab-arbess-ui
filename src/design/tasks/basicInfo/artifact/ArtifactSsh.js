import React from "react";
import Inputs from "../Inputs";
import FindAuth from "../FindAuth";

/**
 * 制品--Ssh
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ArtifactSsh = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"推送文件"}
                isValid={true}
                dataItem={dataItem}

            />
            <Inputs
                name={"putAddress"}
                placeholder={"推送位置"}
                label={"推送位置"}
                isValid={true}
                dataItem={dataItem}

            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default ArtifactSsh
