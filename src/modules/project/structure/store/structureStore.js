import {action} from "mobx";
import qs from "qs";

import {
    DeleteHistoryLog,
    FindAll,
    FindExecState,
    FindHistoryLog,
    FindLikeHistory,
    FindStructureState,
    KillInstance,
    PipelineStartStructure,
    SelectHistoryDetails,
} from "../api/structure";

export class StructureStore {

    // 开始构建
    @action
    pipelineStartStructure = async values =>{
        const params = new FormData()
        params.append("pipelineId", values.pipelineId)
        params.append("userId", values.userId)
        return await PipelineStartStructure(params);
    }

    // 判断当前流水线是否在构建
    @action
    findExecState = async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await FindExecState(param);
    }

    //构建状态
    @action
    findStructureState = async values=>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await FindStructureState(param)
    }

    //  停止构建
    @action
    killInstance = async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await KillInstance(param)
    }


    //历史详情日志
    @action
    findHistoryLog =async values =>{
        const params = new FormData()
        params.append("historyId", values)
        return await FindHistoryLog(params)
    }

    //正在执行的详情
    @action
    findAll =async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await FindAll(param)
    }

    //构建历史
    @action
    selectHistoryDetails =async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await SelectHistoryDetails(param)

    }

    //删除构建历史
    @action
    deleteHistoryLog =async values =>{
        const param = new FormData()
        param.append("historyId", values)
        return await DeleteHistoryLog(param)
    }

    @action
    findLikeHistory = async values=>{
        const params ={
            pipelineId:values.pipelineId,
            state:values.state,
            name:values.name,
            type:values.type,
        }
        return await FindLikeHistory(params)
    }

}

export const STRUCTURE_STORE = 'structureStore'