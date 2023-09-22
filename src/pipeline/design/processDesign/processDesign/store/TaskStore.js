import {observable,action} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

class TaskStore {

    // 多任务数据
    @observable
    taskList = []

    // 必填配置是否完善
    @observable
    validType = []

    // 多任务未填的必需任务
    @observable
    taskMustField = []

    // 抽屉详情数据
    @observable
    dataItem = {}

    // 重新渲染
    @observable
    taskFresh = false

    // 抽屉详情面板遮罩
    @observable
    taskDetailsDrawerMask = true

    /**
     * 改变抽屉详情面板遮罩
     * @param value
     */
    @action
    setTaskDetailsDrawerMask = value =>{
        this.taskDetailsDrawerMask = value
    }

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
            this.taskList = data.data || []
        }
        return data
    }

    /**
     * 获取多任务,文本编辑器
     * @param value
     * @returns {Promise<*>}
     */
    @action
    finYamlTask = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/tasks/finYamlTask",param)
        return data
    }

    /**
     * 更新任务
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateTask = async values =>{
        const data = await Axios.post("/tasks/updateTask",values)
        if(data.code===0){
            await this.findOneTasks({
                taskName:values.taskName,
                pipelineId:values.pipelineId
            })
            this.taskFresh=!this.taskFresh
        }
        return data
    }

    /**
     * 更新任务名称
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateTaskName = async value =>{
        const data = await Axios.post("/tasks/updateTaskName",value)
        if(data.code===0){
            this.dataItem = {
                ...this.dataItem,
                ...value.values
            }
            this.taskFresh=!this.taskFresh
        }
        return data
    }

    /**
     * 删除任务
     */
    @action
    deleteTask = async value =>{
        const params = new FormData()
        params.append("taskName",value.taskName)
        params.append("pipelineId",value.pipelineId)
        const data = await Axios.post("/tasks/deleteTask",params)
        if(data.code===0){
            message.info("删除成功",0.7)
            this.taskFresh = !this.taskFresh
        }
        return data
    }

    /**
     * 获取单个任务详情
     */
    @action
    findOneTasks = async value =>{
        const params = new FormData()
        params.append('taskName',value.taskName)
        params.append('pipelineId',value.pipelineId)
        const data = await Axios.post("/tasks/findOneTasks",params)
        if(data.code===0){
            this.dataItem = data.data
        } else {
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取多任务未填的必需任务
     * @param value
     * @returns {Promise<*>}
     */
    @action
    validTaskMustField = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/tasks/validTaskMustField",param)
        if(data.code===0){
            this.taskMustField = data.data || []
        }
        return data
    }


}

const taskStore = new TaskStore();
export default taskStore
