import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreatePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/createPost",
        method:"post",
        data
    })
}

/**
 * 更新后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdatePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/updatePost",
        method:"post",
        data
    })
}

/**
 * 删除后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeletePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/deletePost",
        method:"post",
        data
    })
}

/**
 * 获取后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllPostConfig (data) {
    return serviceLoc.request({
        url: "/pipelinePost/findAllPost",
        method: "post",
        data
    })
}

/**
 * 是否存在消息发送方式
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  MessageSendType (data){
    return serviceLoc.request({
        url:"/pipelineHome/messageSendType",
        method:"post",
        data
    })
}
