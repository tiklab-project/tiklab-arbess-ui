import {serviceLoc} from "../../../../../common/utils/Requset";

/**
 * 添加条件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/createCond",
        method: "post",
        data
    })
}

/**
 * 删除条件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/deleteCond",
        method: "post",
        data
    })
}

/**
 * 更新条件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/updateCond",
        method: "post",
        data
    })
}

/**
 * 获取所有条件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllTaskCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/findAllTaskCond",
        method: "post",
        data
    })
}
