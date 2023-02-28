import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 开始构建
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  PipelineStartStructure (data){
    return serviceLoc.request({
        url:"/pipelineExec/start",
        method: "post",
        data
    })
}

/**
 * 查询单个流水线是否在构建
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindPipelineState (data){
    return serviceLoc.request({
        url:"/pipelineExec/findPipelineState",
        method: "post",
        data
    })
}

/**
 * 运行状态
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  PipelineRunStatus (data){
    return serviceLoc.request({
        url:"/pipelineExec/pipelineRunStatus",
        method:"post",
        data
    })
}

/**
 * 终止运行
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  KillInstance(data){
    return serviceLoc.request({
        url:"/pipelineExec/killInstance",
        method:"post",
        data
    })
}

/**
 * 所有流水线历史列表
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindUserRunPageHistory(data) {
    return serviceLoc.request({
        url:"/pipelineExec/findUserRunPageHistory",
        method:"post",
        data
    })
}

