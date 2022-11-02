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
            <Inputs
                placeholder={"启动端口"}
                label={"启动端口"}
                name={"startPort"}
                mode={deployType}
            />
            <Inputs
                placeholder={"映射端口"}
                label={"映射端口"}
                name={"mappingPort"}
                mode={deployType}
            />
        </>
    )
}

export default DeployDocker