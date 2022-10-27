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
export function  FindState (data){
    return serviceLoc.request({
        url:"/pipeline/findState",
        method:"post",
        data
    })
}

// 所有动态
export function  Findlogpage (data){
    return serviceLoc.request({
        url:"/oplog/findlogpage",
        method:"post",
        data
    })
}

// 我的代办
export function  Findtodopage (data){
    return serviceLoc.request({
        url:"/todo/findtodopage",
        method:"post",
        data
    })
}

// 我的消息
export function  FindMessageDispatchItemPage(data){
    return serviceLoc.request({
        url:"/message/messageDispatchItem/findMessageDispatchItemPage",
        method:"post",
        data
    })
}