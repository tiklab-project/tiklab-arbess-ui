import React from "react";
import Inputs from "./inputs";

const DeployDocker = props =>{

    const {dataItem} = props
    
    return(
        <>
            <Inputs
                placeholder={" / 代表部署位置"}
                label={"dockerfile文件地址"}
                name={"startAddress"}
                dataItem={dataItem}
                addonbefore={"/"}
            />
        </>
    )
}

export default DeployDocker