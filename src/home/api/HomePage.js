import {serviceLoc} from "../../common/utils/Requset";

// 最近打开的流水线
export function  FindAllOpen (data) {
    return serviceLoc.request({
        url: "/pipeline/findAllOpen",
        method: "post",
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

// 全部消息
export function  FindMessageItemPage(data){
    return serviceLoc.request({
        url:"/message/messageItem/findMessageItemPage",
        method:"post",
        data
    })
}

// 更新消息
export function  UpdateMessageItem(data){
    return serviceLoc.request({
        url:"/message/messageItem/updateMessageItem",
        method:"post",
        data
    })
}

// 删除消息
export function  DeleteMessageItem(data){
    return serviceLoc.request({
        url:"/message/messageItem/deleteMessageItem",
        method:"post",
        data
    })
}
