import {serviceLoc} from "../../../common/utils/requset";

// 最近打开的流水线
export function  FindAllOpen (data){
    return serviceLoc.request({
        url:"/pipelineHome/findAllOpen",
        method:"post",
        data
    })
}

// 近期构建状态
export function  RunState (data){
    return serviceLoc.request({
        url:"/pipeline/findBuildStatus",
        method:"post",
        data
    })
}

// 所有动态
export function  FindLog (data){
    return serviceLoc.request({
        url:"/pipelineWorkSpace/findLog",
        method:"post",
        data
    })
}

// 我的代办
export function  FindTask (data){
    return serviceLoc.request({
        url:"/pipelineWorkSpace/findTask",
        method:"post",
        data
    })
}