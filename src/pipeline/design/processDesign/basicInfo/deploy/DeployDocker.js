import React from "react";
import FormsItem from "../FormsItem";

/**
 * Docker
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployDocker = props =>{

    return(
        <FormsItem
            name={"startAddress"}
            placeholder={" / 代表部署位置"}
            label={"dockerfile文件地址"}
            addonBefore={"/"}
        />
    )
}

export default DeployDocker
