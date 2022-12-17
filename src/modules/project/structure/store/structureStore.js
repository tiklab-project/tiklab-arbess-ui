import {action,observable} from "mobx";

import {
    DeleteHistoryLog,
    FindPipelineState,
    FindAllLog,
    PipelineRunStatus,
    KillInstance,
    PipelineStartStructure,
    FindPageHistory,
    FindPipelineUser,
} from "../api/structure";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class StructureStore {

    @observable leftPageList = []
    @observable pipelineUserList = []
    @observable execData = ""
    @observable itemData = ""
    @observable page = {
        defaultCurrent: 1,
        pageSize: "11",
        total: "1",
    }
    @observable pageCurrent = 1 // 筛选时，设置当前页数初始化

    @observable freshen = false  // 渲染页面

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
                this.leftPageList = []
                this.page = {}
            }
            else{
                this.page.total = data.data.totalPage
                this.leftPageList = data.data.dataList
            }
        }
        return data
    }

    //历史详情日志
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
    findPipelineUser =async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        const data = await FindPipelineUser(param)
        if(data.code===0 && data.data){
            this.pipelineUserList = data.data
        }
        return data
    }

}

export const STRUCTURE_STORE = "structureStore"