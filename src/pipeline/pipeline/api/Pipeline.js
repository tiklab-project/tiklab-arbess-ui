import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 添加流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreatePipeline(data){
    return serviceLoc.request({
        url:"/pipeline/createPipeline",
        method:"post",
        data
    })
}

/**
 * 获取所有流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindAllPipelineStatus(data) {
    return serviceLoc.request({
        url:"/pipeline/findUserPipeline",
        method:"post",
        data
    })
}

/**
 * 模糊搜索流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindLike(data){
    return serviceLoc.request({
        url:"/pipeline/findLikePipeline",
        method:"post",
        data
    })
}

/**
 * 删除流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeletePipeline (data){
    return serviceLoc.request({
        url:"/pipeline/deletePipeline",
        method:"post",
        data
    })
}

/**
 * 更新流水线
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function UpdatePipeline(data){
    return serviceLoc.request({
        url:"/pipeline/updatePipeline",
        method:"post",
        data
    })
}


/**
 * 获取所有收藏
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllFollow(data){
    return serviceLoc.request({
        url:"/pipeline/findUserFollowPipeline",
        method:"post",
        data
    })
}

/**
 * 收藏
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateFollow(data){
    return serviceLoc.request({
        url:"/pipeline/updateFollow",
        method:"post",
        data
    })
}

/**
 * 查询单个流水线信息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindOnePipeline(data){
    return serviceLoc.request({
        url:"/pipeline/findOnePipeline",
        method:"post",
        data
    })
}

/**
 * 获取用户
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindUserPage(data){
    return serviceLoc.request({
        url:"/user/user/findUserPage",
        method:"post",
        data
    })
}

/**
 * 获取项目用户
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindDmUserPage(data){
    return serviceLoc.request({
        url:"/dmUser/findDmUserPage",
        method:"post",
        data
    })
}
