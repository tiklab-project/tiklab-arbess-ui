import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 历史详情日志
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllLog (data){
    return serviceLoc.request({
        url:"/pipelineLog/findAllLog",
        method:"post",
        data
    })
}

/**
 * 获取流水线历史
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindPageHistory (data){
    return serviceLoc.request({
        url:"/pipelineHistory/findPageHistory",
        method:"post",
        data
    })
}

/**
 * 删除构建历史
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:"/pipelineHistory/deleteHistory",
        method:"post",
        data
    })
}
