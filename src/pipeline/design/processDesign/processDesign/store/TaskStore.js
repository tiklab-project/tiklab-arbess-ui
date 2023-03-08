import {observable,action} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

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
        const data = await Axios.post("/tasks/createTask",value)
        if(data.code===0){
            message.info("添加成功",0.7)
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
        const data = await Axios.post("/tasks/finAllTask",param)
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
        const data = await Axios.post("/tasks/updateTask",values)
        if(data.code===0){
            this.dataItem.task[Object.keys(values.values)[0]] = Object.values(values.values)[0]
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
        const data = await Axios.post("/tasks/updateTaskName",value)
        if(data.code===0){
            this.dataItem[Object.keys(value.values)[0]] = Object.values(value.values)[0]
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
        const data = await Axios.post("/tasks/deleteTask",value)
        if(data.code===0){
            message.info("删除成功",0.7)
            this.taskFresh = !this.taskFresh
        }
        return data
    }

}

export const TASK_STORE = "taskStore"
