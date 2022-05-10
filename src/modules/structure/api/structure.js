import {serviceLoc} from "../../../common/api/requset";

//开始构建
export function  PipelineStartStructure (data){
    return serviceLoc.request({
        url:'/pipelineExec/start',
        method: 'post',
        data
    })
}

//判断当前流水线是否在构建
export function  FindExecState (data){
    return serviceLoc.request({
        url:'/pipelineExec/findExecState',
        method: 'post',
        data
    })
}

//构建状态
export function  FindStructureState (data){
    return serviceLoc.request({
        url:'pipelineExec/findState',
        method:'post',
        data
    })
}

//构建历史
export function  SelectHistoryDetails (data){
    return serviceLoc.request({
        url:'/pipelineHistory/findAllHistory',
        method:'post',
        data
    })
}

//历史详情日志
export function  FindHistoryLog (data){
    return serviceLoc.request({
        url:'/pipelineLog/findAllLog',
        method:'post',
        data
    })
}

//删除构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:'/pipelineHistory/deleteHistory',
        method:'post',
        data
    })
}

//查看所有构建
export function  FindAll(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/findAll',
        method:'post',
        data
    })
}