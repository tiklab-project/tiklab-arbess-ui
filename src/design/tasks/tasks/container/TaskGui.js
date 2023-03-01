import React,{useEffect,useState} from "react";
import {observer} from "mobx-react";
import TaskGuiStage from "../components/TaskGuiStage";
import TaskDetails from "../components/TaskDetails";
import {SpinLoading} from "../../../../common/loading/Loading";
import "../components/TaskGui.scss";

/**
 * 流程设计，task图形化界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskGui = props =>{

    const {configStore,pipelineStore} = props

    const {pipeline} = pipelineStore
    const {updateStageName,setCreateValue,configValid,deleteTaskConfig,enabledValid,validType,data,taskFormDrawer,
        setTaskFormDrawer,dataItem,setDataItem,findAllTaskConfig,isFindConfig
    } = configStore

    // 数据未返回时加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        return ()=> setIsLoading(true)
    },[pipeline])

    useEffect(()=>{
        // 初始化task
        pipeline && findAllTaskConfig(pipeline.id).then(res=>{
            setIsLoading(false)
        })
    },[pipeline,isFindConfig])

    useEffect(()=>{
        // 初始化任务内容否填写完善
        pipeline && configValid(pipeline.id)
    },[pipeline,enabledValid])

    return  <div className="guiView" style={taskFormDrawer?{maxWidth:"calc(100% - 480px)"}:null}>
                {
                    isLoading ?
                    <SpinLoading size="large"/>
                    :
                    <TaskGuiStage
                        data={data}
                        pipeline={pipeline}
                        validType={validType}
                        setDataItem={setDataItem}
                        setCreateValue={setCreateValue}
                        setTaskFormDrawer={setTaskFormDrawer}
                        deleteTaskConfig={deleteTaskConfig}
                    />
                }


                <TaskDetails
                    dataItem={dataItem}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    updateStageName={updateStageName}
                />
            </div>
}

export default observer(TaskGui)
