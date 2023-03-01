import {serviceLoc} from "../../common/utils/Requset";

/**
 * 最近打开的流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllOpen (data) {
    return serviceLoc.request({
        url: "/open/findAllOpen",
        method: "post",
        data
    })
}

/**
 * 所有动态
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  Findlogpage (data){
    return serviceLoc.request({
        url:"/oplog/findlogpage",
        method:"post",
        data
    })
}

/**
 * 我的代办
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  Findtodopage (data){
    return serviceLoc.request({
        url:"/todo/findtodopage",
        method:"post",
        data
    })
}

/**
 * 全部消息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindMessageItemPage(data){
    return serviceLoc.request({
        url:"/message/messageItem/findMessageItemPage",
        method:"post",
        data
    })
}

/**
 * 更新消息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateMessageItem(data){
    return serviceLoc.request({
        url:"/message/messageItem/updateMessageItem",
        method:"post",
        data
    })
}

/**
 * 删除消息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteMessageItem(data){
    return serviceLoc.request({
        url:"/message/messageItem/deleteMessageItem",
        method:"post",
        data
    })
}
