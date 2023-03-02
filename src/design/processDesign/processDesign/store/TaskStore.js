import {observable,action} from "mobx";
import {
    CreateTask,
    FinAllTask,
    UpdateTask,
    UpdateTaskName,
    DeleteTask
} from "../api/Task";
import {message} from "antd";

export class TaskStore {

    // 多任务数据
    @observable
    taskList = []

    // 必填配置是否完善
    @observable
    validType = []

    // 重新渲染
    @observable
    taskFresh = false

    // 抽屉详情数据
    @observable
    dataItem = {}

    @action
    setDataItem = value =>{
        this.dataItem = value
    }

    /**
     * 添加任务
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createTask = async value =>{
        const data = await CreateTask(value)
        if(data.code===0){
            message.info("添加成功")
            this.taskFresh = !this.taskFresh
        }
        return data
    }

    /**
     * 获取多任务
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllTask = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await FinAllTask(param)
        if(data.code===0){
            this.taskList = data.data && data.data
        }
        return data
    }

    /**
     * 更新多任务
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateTask = async values =>{
        const data = await UpdateTask(values)
        if(data.code===0){
            this.taskFresh=!this.taskFresh
        }
        return data
    }

    /**
     * 更新多任务名称
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateTaskName = async value =>{
        const data = await UpdateTaskName(value)
        if(data.code===0){
            this.taskFresh=!this.taskFresh
        }
        return data
    }

    /**
     * 删除多任务
     * @param value：taskId
     * @returns {Promise<*>}
     */
    @action
    deleteTask = async value =>{
        const params = new FormData()
        params.append("taskId",value)
        const data = await DeleteTask(params)
        if(data.code===0){
            message.info("删除成功")
            this.taskFresh = !this.taskFresh
        }
        return data
    }

}

export const TASK_STORE = "taskStore"
