import React, {useState} from "react";
import StructureRightLogDrawer from './structureRightLogDrawer'
import StructureRightExecute from "./structureRightExecute";
import StructureRightItem from "./structureRightItem";

const StructureRight = props =>{

    const {rightData,status,deleteHistoryLog,modeData,index,leftExecute,killInstance,rightExecute,freshen,setFreshen,
        historyId } = props
    
    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState('')

    const runWay = i => {
        switch (i) {
            case 1:
                return '手动'
            default:
                return  '自动'
        }
    }

    return(
        <div className='structure-content-right'>
            <div className='structure-content-right-mid'>
                {
                    index === 0 ?
                        <StructureRightExecute
                            freshen={freshen}
                            setFreshen={setFreshen}
                            rightExecute={rightExecute}
                            rightData={rightData}
                            status={status}
                            index={index}
                            leftExecute={leftExecute}
                            setDrawerContent={setDrawerContent}
                            setVisible={setVisible}
                            killInstance={killInstance}
                            runWay={runWay}
                        />
                        :
                        <StructureRightItem
                            freshen={freshen}
                            setFreshen={setFreshen}
                            rightData={rightData}
                            status={status}
                            modeData={modeData}
                            index={index}
                            historyId={historyId}
                            setVisible={setVisible}
                            setDrawerContent={setDrawerContent}
                            deleteHistoryLog={deleteHistoryLog}
                            runWay={runWay}
                        />
                }
            </div>

            <StructureRightLogDrawer
                visible={visible}
                setVisible={setVisible}
                drawerContent={drawerContent}
            />

        </div>
    )
}

export default StructureRight