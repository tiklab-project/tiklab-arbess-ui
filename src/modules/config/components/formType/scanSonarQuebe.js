import React from "react";
import Inputs from "./inputs";
import FindAllProof from "./findAllProof";

const ScanSonarQuebe = props =>{

    return(
        <>
            <Inputs
                placeholder={"请输入项目名称"}
                label={"项目名称"}
                name={"projectName"}
                mode={41}
            />
            <FindAllProof
                type={41}
            />
        </>
    )
}

export default ScanSonarQuebe