import React from "react";
import Inputs from "../Inputs";

/**
 * 部署 -- Docker
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployDocker = props =>{

    const {dataItem} = props

    return(
        <Inputs
            name={"startAddress"}
            placeholder={" / 代表部署位置"}
            label={"dockerfile文件地址"}
            addonBefore={"/"}
            dataItem={dataItem}
        />
    )
}

export default DeployDocker
