import {serviceLoc} from "../../../../common/utils/Requset";

/**
 * 更新触发器
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/updateConfig",
        method:"post",
        data
    })
}

/**
 * 删除触发器
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/deleteConfig",
        method:"post",
        data
    })
}

/**
 * 添加环境变量
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/createConfig",
        method:"post",
        data
    })
}

/**
 * 获取所有触发器
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindAllTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/findAllTriggerConfig",
        method:"post",
        data
    })
}

/**
 * 获取单个触发器信息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  OneAllTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/oneAllTriggerConfig",
        method:"post",
        data
    })
}
