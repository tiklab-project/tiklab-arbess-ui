import React, {useState} from "react";
import StructureRightLogDrawer from './structureRightLogDrawer';
import StructureRightExecute from "./structureRightExecute";
import StructureRightItem from "./structureRightItem";

const StructureRight = props =>{

    const {rightFlowData,status,deleteHistoryLog,modeData,index,setIndex,execState,killInstance,rightExecuteData,
        freshen,setFreshen} = props
    
    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")

    const runWay = i => {
        switch (i) {
            case 1:return "手动"
            default:return "自动"
        }
    }

    return(
        <div className="structure-content-right-mid">
            {
                index === 0 ?
                    <StructureRightExecute
                        freshen={freshen}
                        setFreshen={setFreshen}
                        rightExecuteData={rightExecuteData}
                        status={status}
                        index={index}
                        execState={execState}
                        setDrawerContent={setDrawerContent}
                        setVisible={setVisible}
                        killInstance={killInstance}
                        runWay={runWay}
                    />
                    :
                    <StructureRightItem
                        freshen={freshen}
                        setFreshen={setFreshen}
                        rightFlowData={rightFlowData}
                        status={status}
                        modeData={modeData}
                        index={index}
                        setIndex={setIndex}
                        setVisible={setVisible}
                        setDrawerContent={setDrawerContent}
                        deleteHistoryLog={deleteHistoryLog}
                        runWay={runWay}
                    />
            }
            <StructureRightLogDrawer
                visible={visible}
                setVisible={setVisible}
                drawerContent={drawerContent}
            />
        </div>
    )
}

export default StructureRight