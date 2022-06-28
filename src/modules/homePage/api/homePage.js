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
        url:"/pipelineHome/runState",
        method:"post",
        data
    })
}

// 所有动态
export function  FindUserAction (data){
    return serviceLoc.request({
        url:"/pipelineHome/findUserAction",
        method:"post",
        data
    })
}