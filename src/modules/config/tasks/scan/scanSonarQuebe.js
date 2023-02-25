import React from "react";
import Inputs from "../basicInfo/inputs";
import FindAuth from "../basicInfo/findAuth";

const ScanSonarQuebe = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                dataItem={dataItem}
                name={"projectName"}
                placeholder={"项目名称"}
                label={"项目名称"}
                isValid={true}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default ScanSonarQuebe
