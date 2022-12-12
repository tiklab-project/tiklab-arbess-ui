import React,{useEffect} from "react";
import {observer} from "mobx-react";
import NewStage from "./newStage";
import FormDetailsDrawer from "./formDetailsDrawer";
import "./gui.scss";

const Gui = props =>{

    const {pipelineStore,configStore} = props

    const {setCreacteValue,configValid,deleteTaskConfig,enabledValid,validType,data,taskFormDrawer,setTaskFormDrawer,dataItem,setDataItem} = configStore
    const {pipeline,pipelineId} = pipelineStore
    
    useEffect(()=>{
        // 效验表单
        pipelineId && configValid(pipelineId)
    },[pipelineId,enabledValid])

    return (
        <div className="guiView" style={taskFormDrawer?{maxWidth:"calc(100% - 480px)"}:null}>
            <NewStage
                data={data}
                pipeline={pipeline}
                validType={validType}
                setDataItem={setDataItem}
                setCreacteValue={setCreacteValue}
                setTaskFormDrawer={setTaskFormDrawer}
                deleteTaskConfig={deleteTaskConfig}
            />

            <FormDetailsDrawer
                dataItem={dataItem}
                taskFormDrawer={taskFormDrawer}
                setTaskFormDrawer={setTaskFormDrawer}
            />
        </div>
    )
}

export default observer(Gui)