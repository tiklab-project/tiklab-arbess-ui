import {observable, action} from "mobx";
import qs from "qs";

import {
    PipelineStartStructure,
    FindExecState,
    FindStructureState,
    FindHistoryLog,
    SelectHistoryDetails,
    DeleteHistoryLog,
    FindAll,
    KillInstance
} from "../api/structure";

export class StructureStore {

    // 开始构建
    @action
    pipelineStartStructure = async values =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await PipelineStartStructure(formData);
        return data.data;
    }

    // 判断当前流水线是否在构建
    @action
    findExecState = async(values) =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await FindExecState(formData);
        return data.data;
    }

    //构建状态
    @action
    findStructureState = async (values) =>{
        const param = qs.stringify({pipelineId: values})
        const data = await FindStructureState(param)
        return data.data
    }

    //构建历史
    @action
    selectHistoryDetails =async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        const data = await SelectHistoryDetails(params);
        return data.data;

    }

    //历史详情日志
    @action
    findHistoryLog =async values =>{
        const params = new FormData()
        params.append("historyId", values)
        const data = await FindHistoryLog(params);
        return data.data;
    }

    //删除构建历史
    @action
    deleteHistoryLog = values =>{
        const params = qs.stringify({historyId: values})
        DeleteHistoryLog(params).then(res=>{
            console.log('删除',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    //正在执行的详情
    @action
    findAll =async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        const data = await FindAll(param);
        return data.data;
    }

    //  停止构建
    @action
    killInstance = async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        const data = await KillInstance(param)
        return data.data
    }

}

export const STRUCTURE_STORE = 'structureStore'