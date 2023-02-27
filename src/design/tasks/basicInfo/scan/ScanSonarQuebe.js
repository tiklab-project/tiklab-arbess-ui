import React from "react";
import Inputs from "../Inputs";
import FindAuth from "../FindAuth";

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
