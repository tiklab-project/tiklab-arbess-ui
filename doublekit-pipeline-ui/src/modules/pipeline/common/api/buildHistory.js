import {serviceLoc} from "../../../../common/api/requset";

//查找构建历史
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

//查询构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:'/pipelineHistory/deleteHistoryLog',
        method:'post',
        data
    })
}