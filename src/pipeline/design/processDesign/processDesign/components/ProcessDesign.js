import React,{useState} from "react";
import {observer,inject, Provider} from "mobx-react";
import Stage from "./Stage";
import Task from "./Task";
import TaskDetails from "./TaskDetails";
import TaskAdd from "./TaskAdd";
import condStore from "../../condition/store/ConditionStore";
import authorizeStore from "../store/AuthorizeStore";
import testOnStore from "../store/TestOnStore";
import xcodeStore from "../store/XCodeStore";
import xpackStore from "../store/XPackStore";
import authStore from "../../../../../setting/auth/store/AuthStore";
import hostStore from "../../../../../setting/authHost/store/HostStore";
import serverStore from "../../../../../setting/authServer/store/ServerStore";
import "./Task.scss";

/**
 * 流程设计，task图形化界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProcessDesign = props =>{

    const store = {
        condStore,
        authorizeStore,
        testOnStore,
        xcodeStore,
        xpackStore,
        authStore,
        hostStore,
        serverStore,
    }

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
        <Provider {...store}>
            <div className="guiView">
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
        </Provider>
    )
}

export default inject("pipelineStore")(observer(ProcessDesign))
