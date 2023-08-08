import {action, observable} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

class HistoryStore {

    // 历史列表
    @observable
    historyList = []

    // 重新刷新
    @observable
    historyFresh = false

    // 筛选时，设置当前页数初始化
    @observable
    pageCurrent = 1

    // 分页
    @observable
    page = {
        total: 1,
    }

    /**
     * 设置当前页
     * @param value
     */
    @action
    setPageCurrent = value =>{
        this.pageCurrent = value
    }

    /**
     * 设置列表
     */
    @action
    setHistoryList = value =>{
        this.historyList = value
    }

    /**
     * 开始运行
     * @param value
     * @returns {Promise<*>}
     */
    @action
    execStart = async value =>{
        const params = new FormData()
        params.append("pipelineId", value)
        const data = await Axios.post("/exec/start", params)
        if(data.code!==0){
            message.info(data.msg)
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
            message.info("删除成功",0.5)
            this.pageCurrent = 1
            this.historyFresh = !this.historyFresh
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
        const params = {
            pageParam: {
                pageSize: 13,
                currentPage: this.pageCurrent,
            },
            ...values,
        }
        const data = await Axios.post("/instance/findUserInstance",params)
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
        const params = {
            pageParam: {
                pageSize: 13,
                currentPage: this.pageCurrent,
            },
            ...value,
        }
        const data = await Axios.post("/instance/findPipelineInstance",params)
        this.findHistoryList(data)
        return data
    }


    /**
     * 设置历史列表
     * @param data
     */
    @action
    findHistoryList = data =>{
        if(data.code===0){
            if(data.data && data.data.dataList.length > 0){
                this.historyList = data.data.dataList
                this.page.total = data.data.totalPage
            }
            else{
                this.historyList = []
                this.page = {
                    total: 1,
                }
            }
        }
        else {
            this.historyList = []
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
