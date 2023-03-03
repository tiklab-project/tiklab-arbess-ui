import {serviceLoc} from "../../../../../common/utils/Requset";

/**
 * 添加多阶段
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateStage (data){
    return serviceLoc.request({
        url:"/stage/createStage",
        method:"post",
        data
    })
}

/**
 * 获取所有多阶段
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FinAllStage (data){
    return serviceLoc.request({
        url:"/stage/finAllStage",
        method:"post",
        data
    })
}

/**
 * 更新多阶段名称
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateStageName (data){
    return serviceLoc.request({
        url:"/stage/updateStageName",
        method:"post",
        data
    })
}

/**
 * 删除多阶段
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteStage (data){
    return serviceLoc.request({
        url:"/stage/deleteStage",
        method:"post",
        data
    })
}
