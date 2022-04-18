import React ,{useState} from 'react'
import StructureHistoryDetailsCenter_clone from "./structureHistoryDetailsCenter_clone";
import StructureHistoryDetailsCenter_test from "./structureHistoryDetailsCenter_test";
import StructureHistoryDetailsCenter_structure from "./structureHistoryDetailsCenter_structure";
import StructureHistoryDetailsCenter_deploy from "./structureHistoryDetailsCenter_deploy";
import LogDetails from "./logDetails";

const StructureHistoryDetailsCenter = props =>{

    const {historyLog}=props

    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')

    return(
        <div className='structureHistory-details-center'  >
            <StructureHistoryDetailsCenter_clone
                historyLog={historyLog}
                setDrawer={setDrawer}
                setVisible={setVisible}
            />
            <StructureHistoryDetailsCenter_test
                historyLog={historyLog}
                setDrawer={setDrawer}
                setVisible={setVisible}
            />
            <StructureHistoryDetailsCenter_structure
                historyLog={historyLog}
                setDrawer={setDrawer}
                setVisible={setVisible}
            />
            <StructureHistoryDetailsCenter_deploy
                historyLog={historyLog}
                setDrawer={setDrawer}
                setVisible={setVisible}
            />

            <LogDetails
                visible={visible}
                setVisible={setVisible}
                drawer={drawer}
                historyLog={historyLog}
            />
        </div>
    )
}

export default StructureHistoryDetailsCenter