import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

/**
 * SonarQuebe代码扫描
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
                isRequire={true}
            />
            <FormsAuth />
        </>
    )
}

export default ScanSonarQuebe
