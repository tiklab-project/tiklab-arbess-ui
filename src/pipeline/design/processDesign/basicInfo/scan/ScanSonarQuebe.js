import React from "react";
import FormsItem from "../FormsItem";
import AuthFind from "../AuthFind";

/**
 * SonarQuebe：代码扫描
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ScanSonarQuebe = props =>{

    return(
        <>
            <FormsItem
                name={"projectName"}
                placeholder={"项目名称"}
                label={"项目名称"}
                isValid={true}
            />
            <AuthFind/>
        </>
    )
}

export default ScanSonarQuebe
