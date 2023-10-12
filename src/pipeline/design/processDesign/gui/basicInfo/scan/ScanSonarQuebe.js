import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

/**
 * SonarQuebe：代码扫描
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ScanSonarQuebe = props =>{

    return(
        <>
            <FormsInput
                name={"projectName"}
                placeholder={"项目名称"}
                label={"项目名称"}
                isValid={true}
            />
            <FormsAuth />
        </>
    )
}

export default ScanSonarQuebe
