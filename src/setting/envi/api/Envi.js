import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 删除环境配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeletePipelineScm(data){
    return serviceLoc.request({
        url:"/scm/deletePipelineScm",
        method:"post",
        data
    })
}

/**
 * 更新环境配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function UpdatePipelineScm(data){
    return serviceLoc.request({
        url:"/scm/updatePipelineScm",
        method:"post",
        data
    })
}

/**
 * 查找环境配置
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindAllPipelineScm(data){
    return serviceLoc.request({
        url:"/scm/findAllPipelineScm",
        method:"post",
        data
    })
}
