import {serviceLoc} from "../../../common/utils/Requset";

//开始构建
export function  PipelineStartStructure (data){
    return serviceLoc.request({
        url:"/pipelineExec/start",
        method: "post",
        data
    })
}

//判断单个流水线是否在构建
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

// 所有流水线历史列表
export function FindUserRunPageHistory(data) {
    return serviceLoc.request({
        url:"/pipelineExec/findUserRunPageHistory",
        method:"post",
        data
    })
}

