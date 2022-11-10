import React from "react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";

const ScanSonarQuebe = props =>{

    return(
        <>
            <Inputs
                placeholder={"项目名称"}
                label={"项目名称"}
                name={"projectName"}
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