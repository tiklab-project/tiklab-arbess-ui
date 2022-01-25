/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:01:48
 */
import {service} from "../../../../common/utils/requset";
// 请求接口
export function GetAllWikiList(data){
    return service.request({
        url: "/project/findAllProject ",
        method: "post",
        data
    })
}
// 请求接口
export function GetWikiList(data){
    return service.request({
        url: "/repository/findRepositoryPage",
        method: "post",
        data
    })
}

// 添加知识库
export function AddWikiList(data){
    return service.request({
        url: "/repository/createRepository",
        method: "post",
        data
    })
}

export function DeleWikiList(data){
    return service.request({
        url: "/repository/deleteRepository",
        method: "post",
        data
    })
}

export function UpdateWikiList(data){
    return service.request({
        url: "/repository/updateRepository",
        method: "post",
        data
    })
}
export function SearchWikiList(data){
    return service.request({
        url: "/repository/findRepositoryList",
        method: "post",
        data
    })
}

export function SearchWiki(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}

// 查找所有事项类型
export function GetWikiTypeList(data){
    return service.request({
        url: "/projectType/findAllProjectType",
        method: "post",
        data 
        //请求类型为post 时，
        // params: data 请求类型为get时
    })
}

// 查找所有用户类型
export function GetUseList(data){
    return service.request({
        url: "/user/findAllUser",
        method: "post",
        data 
        //请求类型为post 时，
        // params: data 请求类型为get时
    })
}