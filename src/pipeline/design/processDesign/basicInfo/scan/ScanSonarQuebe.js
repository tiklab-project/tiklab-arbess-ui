import React from "react";
import FormsItem from "../FormsItem";
import AuthFind from "../AuthFind";

/**
 * 代码扫描 -- SonarQuebe
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ScanSonarQuebe = props =>{

    const {dataItem} = props

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
