/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-27 11:07:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-27 13:27:37
 */
import {serviceLoc,service} from "../../../../common/utils/requset";
// import "../../../../mock/mocklog"

export function FindAllProject(data){
    return service.request({
        url: "/api/project/project/findAllProject",
        method: "post",
        data
    })
}

export function FindWorkItemPage(data){
    return service.request({
        url: "/api/project/workItem/findWorkItemPage",
        method: "post",
        data
    })
}

// 事项类型
export function FindAllWorkType(data){
    return service.request({
        url: "/api/project/workType/findAllWorkType",
        method: "post",
        data
    })
}
//获取事项状态
export function FindAllWorkStatus(data){
    return service.request({
        url: "/api/project/workStatus/findAllWorkStatus",
        method: "post",
        data 
    })
}
// 获取用户列表
export function FindAllUser(data){
    return service.request({
        url: "/api/project/user/findAllUser",
        method: "post",
        data 
    })
}

//根据id查找事项
export function FindWorkItem(data){
    return service.request({
        url: "/api/project/workItem/findWorkItem",
        method: "post",
        data 
    })
}