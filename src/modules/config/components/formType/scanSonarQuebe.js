import React from "react";
import Inputs from "./inputs";
import FindAuth from "./findAuth";

const ScanSonarQuebe = props =>{

    return(
        <>
            <Inputs
                name={"projectName"}
                placeholder={"项目名称"}
                label={"项目名称"}
                mode={41}
                isValid={true}
            />
            <FindAuth
                type={41}
            />
        </>
    )
}

export default ScanSonarQuebe