import {serviceLoc} from "../../../../common/api/requset";

//开始构建
export function  PipelineStructure (data){
    return serviceLoc.request({
        url:'/pipelineLog/pipelineStructure',
        method: 'post',
        data
    })
}

//构建状态
export function  SelectStructureState (data){
    return serviceLoc.request({
        url:'/pipelineLog/selectStructureState',
        method:'post',
        data
    })
}

//构建历史
export function  SelectHistoryDetails (data){
    return serviceLoc.request({
        url:'/pipelineHistory/selectHistoryDetails',
        method:'post',
        data
    })
}

//历史详情日志
export function  SelectHistoryLog (data){
    return serviceLoc.request({
        url:'/pipelineHistory/selectHistoryLog',
        method:'post',
        data
    })
}

//删除构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:'/pipelineHistory/deleteHistoryLog',
        method:'post',
        data
    })
}