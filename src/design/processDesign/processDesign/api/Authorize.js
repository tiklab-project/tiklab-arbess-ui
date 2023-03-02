import {serviceLoc} from "../../../../common/utils/Requset";

/**
 * 授权--Code
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindCode (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findCode",
        method: "post",
        data
    })
}

/**
 * 授权--获取token
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAccessToken (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findAccessToken",
        method: "post",
        data
    })
}

/**
 * 授权--获取仓库
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllStorehouse (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findAllStorehouse",
        method: "post",
        data
    })
}

/**
 * 授权--获取分支
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindBranch (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findBranch",
        method: "post",
        data
    })
}

