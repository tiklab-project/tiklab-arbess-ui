import {serviceLoc} from "../../../../common/utils/requset";

//开始构建
export function  PipelineStartStructure (data){
    return serviceLoc.request({
        url:"/pipelineExec/start",
        method: "post",
        data
    })
}

//判断当前流水线是否在构建
export function  FindExecState (data){
    return serviceLoc.request({
        url:"/pipelineExec/findExecState",
        method: "post",
        data
    })
}

//构建状态
export function  FindStructureState (data){
    return serviceLoc.request({
        url:"/pipelineExec/findState",
        method:"post",
        data
    })
}

//停止构建
export function  KillInstance(data){
    return serviceLoc.request({
        url:"/pipelineExec/killInstance",
        method:"post",
        data
    })
}

//历史详情日志
export function  FindHistoryLog (data){
    return serviceLoc.request({
        url:"/pipelineLog/findAllLog",
        method:"post",
        data
    })
}


//正在执行的详情
export function  FindAllPipelineConfig(data){
    return serviceLoc.request({
        url:"/pipelineConfig/findAllPipelineConfig",
        method:"post",
        data
    })
}

//构建历史
export function  FindPageHistory (data){
    return serviceLoc.request({
        url:"/pipelineHistory/findPageHistory",
        method:"post",
        data
    })
}

//删除构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:"/pipelineHistory/deleteHistory",
        method:"post",
        data
    })
}

// 查询构建用户
export function  FindPipelineUser(data){
    return serviceLoc.request({
        url:"/pipeline/findPipelineUser",
        method:"post",
        data
    })
}