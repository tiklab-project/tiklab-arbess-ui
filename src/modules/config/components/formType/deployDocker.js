import React from "react";
import Inputs from "./inputs";


const DeployDocker = props =>{

    const {deployType} = props
    
    return(
        <>
            <Inputs
                placeholder={" / 代表部署位置"}
                label={"dockerfile文件地址"}
                name={"startAddress"}
                mode={deployType}
                addonBefore={"/"}
            />
        </>
    )
}

export default DeployDocker