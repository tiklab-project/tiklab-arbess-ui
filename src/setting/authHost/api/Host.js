import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加主机配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/createAuthHost",
        method:"post",
        data
    })
}

/**
 * 删除主机配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/deleteAuthHost",
        method:"post",
        data
    })
}

/**
 * 更新主机配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/updateAuthHost",
        method:"post",
        data
    })
}

/**
 * 获取主机配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllAuthHostList(data){
    return serviceLoc.request({
        url:"/authHost/findAllAuthHostList ",
        method:"post",
        data
    })
}



