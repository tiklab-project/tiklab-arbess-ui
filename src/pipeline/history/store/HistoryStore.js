import {action, observable} from "mobx";
import {message} from "antd";
import {Axios, getUser} from "tiklab-core-ui";

class HistoryStore {

    // 历史列表
    @observable
    historyList = []

    // 分页
    @observable
    page = {
        currentPage: 1,
        totalRecord: 1,
        totalPage: 1,
    }

    /**
     * 设置列表
     */
    @action
    setHistoryList = value =>{
        this.historyList = value
    }

    /**
     * 回滚
     * @param value
     * @returns {Promise<*>}
     */
    @action
    rollBackStart = async value =>{
        const params = {
            ...value,
            runWay:1,
            userId:getUser().userId,
        }
        const data = await Axios.post("/exec/rollBackStart", params)
        if(data.code!==0){
            message.error(data.msg)
        }
        return data
    }

    /**
     * 开始运行
     * @param value
     * @returns {Promise<*>}
     */
    @action
    execStart = async value =>{
        const params = {
            ...value,
            runWay:1,
            userId:getUser().userId,
        }
        const data = await Axios.post("/exec/start", params)
        if(data.code!==0){
            message.error(data.msg)
        }
        return data
    }

    /**
     * 终止运行
     * @param value
     * @returns {Promise<*>}
     */
    @action
    execStop = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return await Axios.post("/exec/stop", param)
    }

    /**
     * 继续执行
     * @param value
     * @returns {Promise<*>}
     */
    @action
    keepOn = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return await Axios.post("/exec/keepOn", param)
    }

    /**
     * 获取多任务历史日志详情
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findTaskInstance = async value =>{
        const param = new FormData()
        param.append("instanceId",value)
        return await Axios.post("/taskInstance/findTaskInstance", param)
    }

    /**
     * 获取多阶段历史日志详情
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findStageInstance = async value =>{
        const param = new FormData()
        param.append("instanceId",value)
        return await Axios.post("/stageInstance/findStageInstance", param)
    }

    /**
     * 删除历史
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteInstance =async value =>{
        const param = new FormData()
        param.append("instanceId", value)
        const data = await Axios.post("/instance/deleteInstance",param)
        if(data.code===0){
            message.success("删除成功")
        }
        return data
    }

    /**
     * 获取所有流水线历史列表
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findUserInstance = async values =>{
        const data = await Axios.post("/instance/findUserInstance",values)
        this.findHistoryList(data)
        return data
    }


    /**
     * 获取单个流水线历史
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findPipelineInstance = async value =>{
        const data = await Axios.post("/instance/findPipelineInstance",value)
        this.findHistoryList(data)
        return data
    }


    /**
     * 设置历史列表
     * @param data
     */
    @action
    findHistoryList = data =>{
        if(data.code===0 && data.data){
            this.historyList = data.data.dataList
            this.page = {
                currentPage:data.data.currentPage,
                totalPage:data.data.totalPage,
                totalRecord:data.data.totalRecord,
            }
        } else {
            this.historyList = []
            this.page = {
                currentPage:1,
                totalPage:1,
                totalRecord:1,
            }
        }
    }

    /**
     * 当前构建历史信息
     * @param {*} value
     * @returns
     */
    @action
    findOneInstance = value =>{
        const param = new FormData()
        param.append('instanceId',value)
        return Axios.post('/instance/findOneInstance', param)
    }

    /**
     * 多任务构建全部日志
     * @param {*} value
     * @returns
     */
     @action
     findAllInstanceLogs = value =>{
         const param = new FormData()
         param.append('instanceId',value)
         return Axios.post('/taskInstance/findAllInstanceLogs', param)
     }

    /**
     * 多阶段构建全部日志
     * @param {*} value
     * @returns
     */
    @action
    findAllStageInstanceLogs = value =>{
        const param = new FormData()
        param.append('instanceId',value)
        return Axios.post('/stageInstance/findAllStageInstanceLogs', param)
    }

}

const historyStore = new HistoryStore();
export default historyStore
