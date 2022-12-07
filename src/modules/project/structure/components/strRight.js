import React,{useState} from "react";
import {observer} from "mobx-react";
import StrRightLogDrawer from "./strRightLogDrawer";
import StrRightExecute from "./strRightExecute";
import StrRightItem from "./strRightItem";

const StrRight = props =>{

    const {structureStore,status,pipelineId,pipeline} = props

    const {deleteHistoryLog,killInstance,rightFlowData,modeData,index,rightExecuteData,execState} = structureStore

    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")

    return(
        <div className="right-mid">
            {
                index === 0 ?
                    <StrRightExecute
                        pipeline={pipeline}
                        rightExecuteData={rightExecuteData}
                        status={status}
                        execState={execState}
                        killInstance={killInstance}
                        pipelineId={pipelineId}
                    />
                    :
                    <StrRightItem
                        pipeline={pipeline}
                        rightFlowData={rightFlowData}
                        status={status}
                        modeData={modeData}
                        setVisible={setVisible}
                        setDrawerContent={setDrawerContent}
                        deleteHistoryLog={deleteHistoryLog}
                    />
            }
            <StrRightLogDrawer
                visible={visible}
                setVisible={setVisible}
                drawerContent={drawerContent}
            />
        </div>
    )
}

export default observer(StrRight)