import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加认证配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateAuth(data){
    return serviceLoc.request({
        url:"/auth/createAuth",
        method:"post",
        data
    })
}

/**
 * 删除认证配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteAuth(data){
    return serviceLoc.request({
        url:"/auth/deleteAuth",
        method:"post",
        data
    })
}

/**
 * 更新认证配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateAuth(data){
    return serviceLoc.request({
        url:"/auth/updateAuth",
        method:"post",
        data
    })
}

/**
 * 获取认证配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllAuth(data){
    return serviceLoc.request({
        url:"/auth/findAllAuth",
        method:"post",
        data
    })
}



