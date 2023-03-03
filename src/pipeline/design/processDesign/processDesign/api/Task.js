import {serviceLoc} from "../../../../../common/utils/Requset";

/**
 * 获取所有任务
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateTask (data){
    return serviceLoc.request({
        url:"/tasks/createTask",
        method:"post",
        data
    })
}

/**
 * 获取所有任务
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FinAllTask (data){
    return serviceLoc.request({
        url:"/tasks/finAllTask",
        method:"post",
        data
    })
}

/**
 * 创建任务
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateTask (data){
    return serviceLoc.request({
        url:"/tasks/updateTask",
        method:"post",
        data
    })
}

/**
 * 更改任务名称
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateTaskName (data){
    return serviceLoc.request({
        url:"/tasks/updateTaskName",
        method:"post",
        data
    })
}

/**
 * 删除任务
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteTask (data){
    return serviceLoc.request({
        url:"/tasks/deleteTask",
        method:"post",
        data
    })
}
