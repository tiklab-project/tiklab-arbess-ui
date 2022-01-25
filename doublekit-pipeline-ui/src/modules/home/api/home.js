/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-11-22 14:02:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-11-23 09:13:59
 */
import {service} from "../../../common/utils/requset";

// 获取我的项目
export function StatProjectWorkItem (data){
    return service.request({
        url: "/workItemStat/statProjectWorkItem",
        method: "post",
        data 
    })
}
// 获取我的事项统计
export function StatWorkItemByBusStatus (data){
    return service.request({
        url: "/workItemStat/statWorkItemByBusStatus",
        method: "post",
        data 
    })
}

// 获取我的迭代统计
export function ManageSprint (data){
    return service.request({
        url: "/workItemStat/statManageSprint",
        method: "post",
        data 
    })
}

// 获取所有事项分类
export function WorkType(data){
    return service.request({
        url: "/workType/findAllWorkType",
        method: "post",
        data 
    })
}

// 获取所有事项状态
export function FindWorkStatusListBySorts(data){
    return service.request({
        url: "/workStatus/findWorkStatusListBySorts",
        method: "post",
        data 
    })
}
