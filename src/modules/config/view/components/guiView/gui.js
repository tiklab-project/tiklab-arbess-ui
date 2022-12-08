import React,{useEffect} from "react";
import {observer} from "mobx-react";
import NewStage from "./newStage";
import FormDetailsDrawer from "./formDetailsDrawer";
import "./gui.scss";

const Gui = props =>{

    const {pipelineStore,configStore} = props

    const {configValid,deleteTaskConfig,enabledValid,validType,data,taskFormDrawer,setTaskFormDrawer,dataItem,setDataItem} = configStore
    const {pipeline,pipelineId} = pipelineStore
    
    useEffect(()=>{
        // 效验表单
        pipeline && configValid(pipelineId)
    },[pipeline,enabledValid])

    return (
        <div className="guiView">
            <div className="guiView-content">
                <div className="guiView-main_group">
                    <NewStage
                        data={data}
                        validType={validType}
                        pipeline={pipeline}
                        setTaskFormDrawer={setTaskFormDrawer}
                        setDataItem={setDataItem}
                        deleteTaskConfig={deleteTaskConfig}
                    />
                </div>

                <FormDetailsDrawer
                    dataItem={dataItem}
                    pipelineId={pipelineId}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    configValid={configValid}
                />

            </div>
        </div>
    )
}

export default observer(Gui)