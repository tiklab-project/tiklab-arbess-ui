import {action,observable} from "mobx";

import {
    DeleteHistoryLog,
    FindPipelineState,
    FindAllLog,
    PipelineRunStatus,
    KillInstance,
    PipelineStartStructure,
    FindPageHistory,
    FindUserAllHistory
} from "../api/structure";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class StructureStore {

    @observable historyList = [] // 历史列表
    @observable execData = "" // 构建历史运行状态数据
    @observable itemData = "" // 构建历史完成状态数据
    @observable freshen = false  // 重新渲染页面
    @observable strDetails = false // 构建详情页面数据未返回时加载状态
    @observable pageCurrent = 1 // 筛选时，设置当前页数初始化
    @observable page = {
        defaultCurrent: 1,
        pageSize: "11",
        total: "1",
    }

    @action
    setFreshen = value =>{
        this.freshen = value
    }

    @action
    setPageCurrent = value =>{
        this.pageCurrent = value
    }

    // 开始构建
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

    // 判断当前流水线是否在构建
    @action
    findPipelineState = async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        const data = await FindPipelineState(param)
        return data
    }

    //构建状态
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

    //停止构建
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

    //构建历史
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
        if(data.code===0 && data.data){
            if(data.data.dataList.length===0){
                this.historyList = []
                this.page = {}
            }
            else{
                this.page.total = data.data.totalPage
                this.historyList = data.data.dataList
            }
        }
        return data
    }

    //历史详情日志
    @action
    findAllLog =async value =>{
        this.strDetails = true
        const param = new FormData()
        param.append("historyId", value)
        const data = await FindAllLog(param)
        if(data.code===0){
            this.itemData = data.data && data.data
            this.strDetails = false
        }
        return data
    }

    //删除构建历史
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

    @action
    findUserAllHistory = async value =>{
        const data = await FindUserAllHistory()
        if(data.code===0){
            this.historyList = data.data && data.data
        }
        else {
            this.historyList = []
        }
    }

}

export const STRUCTURE_STORE = "structureStore"
