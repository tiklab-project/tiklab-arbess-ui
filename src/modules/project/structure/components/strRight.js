import React,{useState} from "react";
import {observer} from "mobx-react";
import StrRightLogDrawer from "./strRightLogDrawer";
import StrRightExec from "./strRightExec";
import StrRightItem from "./strRightItem";

const StrRight = props =>{

    const {structureStore,status,pipeline} = props

    const {deleteHistoryLog,killInstance,rightFlowData,modeData,index,rightExecuteData,execState} = structureStore

    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")

    return(
        <div className="right-mid">
            {
                index === 0 ?
                    <StrRightExec
                        pipeline={pipeline}
                        rightExecuteData={rightExecuteData}
                        status={status}
                        execState={execState}
                        killInstance={killInstance}
                        setVisible={setVisible}
                        setDrawerContent={setDrawerContent}
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