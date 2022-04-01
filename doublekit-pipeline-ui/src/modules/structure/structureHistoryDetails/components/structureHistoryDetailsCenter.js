import React  from 'react'
import StructureHistoryDetailsCenter_clone from "./structureHistoryDetailsCenter_clone";
import StructureHistoryDetailsCenter_test from "./structureHistoryDetailsCenter_test";
import StructureHistoryDetailsCenter_structure from "./structureHistoryDetailsCenter_structure";
import StructureHistoryDetailsCenter_deploy from "./structureHistoryDetailsCenter_deploy";


const StructureHistoryDetailsCenter = props =>{

    const {historyLog,findHistoryLog}=props

    return(
            <div className='structureHistory-details-center'  >
            <StructureHistoryDetailsCenter_clone
                historyLog={historyLog}
                findHistoryLog={findHistoryLog}
            />
            <StructureHistoryDetailsCenter_test
                historyLog={historyLog}
                findHistoryLog={findHistoryLog}
            />
            <StructureHistoryDetailsCenter_structure
                historyLog={historyLog}
                findHistoryLog={findHistoryLog}
            />
            <StructureHistoryDetailsCenter_deploy
                historyLog={historyLog}
                findHistoryLog={findHistoryLog}
            />
        </div>
    )
}

export default StructureHistoryDetailsCenter