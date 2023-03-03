import {serviceLoc} from "../../../../common/utils/Requset";

/**
 * 添加后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreatePost (data){
    return serviceLoc.request({
        url:"/postprocess/createPost",
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
export function  UpdatePost (data){
    return serviceLoc.request({
        url:"/postprocess/updatePost",
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
export function  DeletePost(data){
    return serviceLoc.request({
        url:"/postprocess/deletePost",
        method:"post",
        data
    })
}

/**
 * 获取流水线后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindPipelinePost (data) {
    return serviceLoc.request({
        url: "/postprocess/findPipelinePost",
        method: "post",
        data
    })
}

/**
 * 获取任务后置处理
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindTaskPost (data) {
    return serviceLoc.request({
        url: "/postprocess/findTaskPost",
        method: "post",
        data
    })
}

/**
 * 获取未配置的消息发送方式
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
