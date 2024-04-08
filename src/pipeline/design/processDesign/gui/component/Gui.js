import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import Stage from "./Stage";
import Task from "./Task";
import TaskDetails from "./TaskDetails";
import TaskAdd from "./TaskAdd";
import "./Task.scss";

/**
 * 流程设计，task图形化界面
 */
const Gui = props =>{

    const {pipelineStore} = props

    const {pipeline} = pipelineStore

    // 新任务抽屉状态
    const [newStageDrawer,setNewStageDrawer] = useState(false)

    // 任务详情抽屉状态
    const [taskFormDrawer,setTaskFormDrawer] = useState(false)

    // 添加任务的数据
    const [createValue,setCreateValue] = useState({})

    /**
     * 新建任务弹窗事件操作
     */
    const addTask = () =>{
        if(taskFormDrawer){
            setTaskFormDrawer(false)
        }
        setNewStageDrawer(true)
    }

    return  (
        <div className="guiView">
            {
                pipeline && pipeline.type===1 ?
                    <Task
                        {...props}
                        addTask={addTask}
                        setTaskFormDrawer={setTaskFormDrawer}
                        setCreateValue={setCreateValue}
                    />
                    :
                    <Stage
                        {...props}
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
                pipeline={pipeline}
                taskFormDrawer={taskFormDrawer}
                setTaskFormDrawer={setTaskFormDrawer}
            />

        </div>
    )
}

export default inject("pipelineStore")(observer(Gui))

