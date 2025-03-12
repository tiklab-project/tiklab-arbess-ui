import {observable,action} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

class TaskStore {

    //多任务未填的必需任务
    @observable
    taskMustField = []
    //必填字段刷新
    @observable
    mustFieldFresh = false;
    //表单数据
    @observable
    dataItem = {}
    //重新渲染
    @observable
    taskFresh = false
    //任务权限控制
    @observable
    taskPermissions = [];

    /**
     * 设置任务权限控制
     */
    @action
    setTaskPermissions = value =>{
        this.taskPermissions = value;
    }

    /**
     * 设置表单数据
     * @param value
     */
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
            this.taskFresh = !this.taskFresh
        }
        if(data.code===58001){
            message.info(data.msg)
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
        const param = {
            taskId:this.dataItem.taskId,
            values,
        }
        const data = await Axios.post("/tasks/updateTask",param)
        if(data.code===0){
            // this.taskFresh = !this.taskFresh
            this.mustFieldFresh = !this.mustFieldFresh
            await this.findOneTasksOrTask(param.taskId)
        } else {
            this.dataItem = {...this.dataItem}
        }
        return data
    }

    /**
     * 更新任务名称
     * @param taskName
     * @returns {Promise<*>}
     */
    @action
    updateTaskName = async taskName =>{
        const param = {
            taskId: this.dataItem.taskId,
            taskName
        }
        const data = await Axios.post("/tasks/updateTaskName",param)
        if(data.code===0){
            this.taskFresh = !this.taskFresh
            this.dataItem = {
                ...this.dataItem,
                taskName
            }
        }
        if(data.code===58001){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 删除任务
     */
    @action
    deleteTask = async value =>{
        const params = new FormData()
        params.append("taskId",value)
        const data = await Axios.post("/tasks/deleteTask",params)
        if(data.code===0){
            message.info("删除成功")
            this.taskFresh = !this.taskFresh
        }
        return data
    }

    /**
     * 获取单个任务详情
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findOneTasksOrTask = async value =>{
        const params = new FormData()
        params.append('taskId',value)
        const data = await Axios.post("/tasks/findOneTasksOrTask",params)
        if(data.code===0){
            this.dataItem = {
                ...data.data,
                formType:'task',
            }
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
            this.dataItem = {
                ...data.data,
                formType:'task',
            }
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
