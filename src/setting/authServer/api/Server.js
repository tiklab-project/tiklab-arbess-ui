import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加服务配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/createAuthServer",
        method:"post",
        data
    })
}

/**
 * 删除服务配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/deleteAuthServer",
        method:"post",
        data
    })
}

/**
 * 更新服务配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function UpdateAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/updateAuthServer",
        method:"post",
        data
    })
}

/**
 * 获取服务配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindAllAuthServerList(data) {
    return serviceLoc.request({
        url:"/authServer/findAllAuthServerList",
        method:"post",
        data
    })
}

/**
 * 获取回调地址
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CallbackUrl(data) {
    return serviceLoc.request({
        url:"/codeAuthorize/callbackUrl",
        method:"post",
        data
    })
}
