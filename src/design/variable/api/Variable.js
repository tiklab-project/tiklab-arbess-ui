import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加变量
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/createVariable",
        method:"post",
        data
    })
}

/**
 * 添加变量
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/deleteVariable",
        method:"post",
        data
    })
}

/**
 * 添加变量
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function UpdateVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/updateVariable",
        method:"post",
        data
    })
}

/**
 * 添加变量
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindAllVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/findAllVariable",
        method:"post",
        data
    })
}
