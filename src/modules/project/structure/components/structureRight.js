import React,{useState} from "react";
import StructureRightLogDrawer from "./structureRightLogDrawer";
import StructureRightExecute from "./structureRightExecute";
import StructureRightItem from "./structureRightItem";
import {inject,observer} from "mobx-react";

const StructureRight = props =>{

    const {structureStore,status,freshen,setFreshen,setPageCurrent,pipelineId} = props

    const {deleteHistoryLog, killInstance,rightFlowData,modeData,index,setIndex,
        rightExecuteData,execState} = structureStore

    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")

    return(
        <div className="right-mid">
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
                        setPageCurrent={setPageCurrent}
                        pipelineId={pipelineId}
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
                        setPageCurrent={setPageCurrent}
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

export default inject("structureStore")(observer(StructureRight))