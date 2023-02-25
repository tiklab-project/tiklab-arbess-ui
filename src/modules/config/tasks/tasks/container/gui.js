import React,{useEffect,useState} from "react";
import {observer} from "mobx-react";
import NewStage from "../components/newStage";
import FormDetailsDrawer from "../components/formDetailsDrawer";
import {SpinLoading} from "../../../../common/loading/loading";
import "../components/gui.scss";

const Gui = props =>{

    const {configStore,pipelineStore} = props

    const {pipeline} = pipelineStore
    const {updateStageName,setCreacteValue,configValid,deleteTaskConfig,enabledValid,validType,data,taskFormDrawer,
        setTaskFormDrawer,dataItem,setDataItem,findAllTaskConfig,isFindConfig} = configStore

    const [isLoading,setIsLoading] = useState(true) // 数据未返回时加载状态

    useEffect(()=>{
        return ()=> setIsLoading(true)
    },[pipeline])

    // 表单初始化
    useEffect(()=>{
        pipeline && findAllTaskConfig(pipeline.id).then(res=>{
            setIsLoading(false)
        })
    },[pipeline,isFindConfig])

      // 效验表单
    useEffect(()=>{
        pipeline && configValid(pipeline.id)
    },[pipeline,enabledValid])

    return  <div className="guiView" style={taskFormDrawer?{maxWidth:"calc(100% - 480px)"}:null}>
                {
                    isLoading ?
                    <SpinLoading size="large"/>
                    :
                    <NewStage
                        data={data}
                        pipeline={pipeline}
                        validType={validType}
                        setDataItem={setDataItem}
                        setCreacteValue={setCreacteValue}
                        setTaskFormDrawer={setTaskFormDrawer}
                        deleteTaskConfig={deleteTaskConfig}
                    />
                }


                <FormDetailsDrawer
                    dataItem={dataItem}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    updateStageName={updateStageName}
                />
            </div>
}

export default observer(Gui)
