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
export function  FindPipelineState (data){
    return serviceLoc.request({
        url:"/pipelineExec/findPipelineState",
        method: "post",
        data
    })
}

//构建状态
export function  PipelineRunStatus (data){
    return serviceLoc.request({
        url:"/pipelineExec/pipelineRunStatus",
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
export function  FindAllLog (data){
    return serviceLoc.request({
        url:"/pipelineLog/findAllLog",
        method:"post",
        data
    })
}


//正在执行的详情
export function  FindAllPipelineConfig(data){
    return serviceLoc.request({
        url:"/pipelineConfig/findAllConfig",
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
