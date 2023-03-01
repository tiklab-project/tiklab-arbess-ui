import {action,observable} from "mobx";
import {
    DeleteHistoryLog,
    FindAllLog,
    FindPageHistory,
} from "../api/History";
import {
    FindPipelineState,
    PipelineRunStatus,
    KillInstance,
    PipelineStartStructure,
    FindUserRunPageHistory
} from "../api/Execute";
import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class HistoryStore {

    // 历史列表
    @observable
    historyList = []

    // 构建历史运行状态数据
    @observable
    execData = ""

    // 构建历史完成状态数据
    @observable
    itemData = ""

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
     * 开始构建
     * @param values
     * @returns {Promise<*>}
     */
    @action
    pipelineStartStructure = async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        params.append("userId", getUser().userId)
        const data = await PipelineStartStructure(params)
        if(data.code===0 && data.data===1){
            this.freshen = !this.freshen
        }
        return data
    }

    /**
     * 判断当前流水线是否在构建
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findPipelineState = async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        const data = await FindPipelineState(param)
        return data
    }

    /**
     * 构建状态
     * @param value
     * @returns {Promise<*>}
     */
    @action
    pipelineRunStatus = async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        const data = await PipelineRunStatus(param)
        if(data.code===0){
            if(data.data){
                this.execData = data.data
                if(data.data.allState === 0){
                    this.freshen = !this.freshen
                }
            }
        }
        return data
    }

    /**
     * 终止运行
     * @param values
     * @returns {Promise<void>}
     */
    @action
    killInstance = async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        params.append("userId",getUser().userId)
        const data = await KillInstance(params)
        if(data.code===0){
            this.pageCurrent = 1
            this.freshen = !this.freshen
        }
    }

    /**
     * 历史详情日志
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllLog =async value =>{
        const param = new FormData()
        param.append("historyId", value)
        const data = await FindAllLog(param)
        if(data.code===0){
            this.itemData = data.data && data.data
        }
        return data
    }

    /**
     * 删除历史
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteHistoryLog =async value =>{
        const param = new FormData()
        param.append("historyId", value)
        const data = await DeleteHistoryLog(param)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.pageCurrent = 1
            this.freshen = !this.freshen
        }
        return data
    }


    /**
     * 单个流水线历史列表
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findPageHistory =async values =>{
        const params = {
            pageParam: {
                pageSize: 13,
                currentPage: this.pageCurrent,
            },
            ...values,
        }
        const data = await FindPageHistory(params)
        this.findHistoryList(data)
        return data
    }

    /**
     * 所有流水线历史列表
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findUserRunPageHistory = async values =>{
        const params = {
            pageParam: {
                pageSize: 13,
                currentPage: this.pageCurrent,
            },
            ...values,
        }
        const data = await FindUserRunPageHistory(params)
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
