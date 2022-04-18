import React, {useState} from "react";
import StructureCenter_clone from "./structureCenter_clone";
import StructureCenter_test from "./structureCenter_test";
import StructureCenter_structure from "./structureCenter_structure";
import StructureCenter_deploy from "./structureCenter_deploy";

const StructureCenter = props =>{

    const {logList} = props

    return(
        <div className='structure-mid'>
            <StructureCenter_clone
                logList={logList}
            />
            <StructureCenter_test
                logList={logList}
            />
            <StructureCenter_structure
                logList={logList}
            />
            <StructureCenter_deploy
                logList={logList}
            />
        </div>
    )
}

export default StructureCenter