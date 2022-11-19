import React from "react";
import Inputs from "./inputs";


const DeployDocker = props =>{

    const {deployType} = props
    
    return(
        <>
            <Inputs
                name={"startAddress"}
                placeholder={" / 代表部署位置"}
                label={"dockerfile文件地址"}
                mode={deployType}
                addonBefore={"/"}
            />
        </>
    )
}

export default DeployDocker