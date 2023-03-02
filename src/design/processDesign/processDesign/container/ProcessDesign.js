import React,{useEffect,useState} from "react";
import {observer} from "mobx-react";
import Stage from "../components/Stage";
import Task from "../components/Task";
import TaskDetails from "../components/TaskDetails";
import TaskAdd from "../components/TaskAdd";
import "../components/Task.scss";

/**
 * 流程设计，task图形化界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProcessDesign = props =>{

    const {pipelineStore} = props

    const {pipeline} = pipelineStore

    // 新任务抽屉状态
    const [newStageDrawer,setNewStageDrawer] = useState(false)

    // 任务详情抽屉状态
    const [taskFormDrawer,setTaskFormDrawer] = useState(false)

    // 添加任务的数据
    const [createValue,setCreateValue] = useState({})

    console.log("createValue::",createValue)

    /**
     * 新建任务弹窗事件操作
     */
    const addTask = () =>{
        setTaskFormDrawer(false)
        setNewStageDrawer(true)
    }

    return  <div className="guiView" style={taskFormDrawer?{maxWidth:"calc(100% - 480px)"}:null}>
                {
                    pipeline && pipeline.type===1 ?
                        <Task
                            pipeline={pipeline}
                            addTask={addTask}
                            setTaskFormDrawer={setTaskFormDrawer}
                            setCreateValue={setCreateValue}
                        />
                        :
                        <Stage
                            pipeline={pipeline}
                            addTask={addTask}
                            setTaskFormDrawer={setTaskFormDrawer}
                            setCreateValue={setCreateValue}
                        />
                }

                <TaskAdd
                    pipeline={pipeline}
                    createValue={createValue}
                    newStageDrawer={newStageDrawer}
                    setNewStageDrawer={setNewStageDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                />

                <TaskDetails
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                />

            </div>
}

export default observer(ProcessDesign)
