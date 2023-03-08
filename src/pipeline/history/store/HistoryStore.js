import {action, observable} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

export class HistoryStore {

    // 历史列表
    @observable
    historyList = []

    // 构建历史运行状态数据
    @observable
    execData = ""

    // 重新渲染页面
    @observable
    freshen = false

    // 筛选时，设置当前页数初始化
    @observable
    pageCurrent = 1

    // 分页
    @observable
    page = {
        defaultCurrent: 1,
        pageSize: "11",
        total: "1",
    }

    /**
     * 设置刷新
     * @param value
     */
    @action
    setFreshen = value =>{
        this.freshen = value
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
    setHistoryList = () =>{
        this.historyList = []
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
        return await Axios.post("/exec/start", params)
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
        const data = await Axios.post("/taskInstance/findTaskInstance",param)
        if(data.code===0){
            this.execData = data.data && data.data
        }
        return data
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
        const data = await Axios.post("/stageInstance/findStageInstance",param)
        if(data.code===0){
            this.execData = data.data && data.data
        }
        return data
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
            this.freshen = !this.freshen
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
                this.page.total = data.data.totalPage
                this.historyList = data.data.dataList
            }
            else{
                this.historyList = []
                this.page = {}
            }
        }
        else {
            this.historyList = []
        }
    }

}

export const HISTORY_STORE = "historyStore"