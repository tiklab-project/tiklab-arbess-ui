/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-08 14:23:23
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:15:20
 */
import {service} from "../../../common/utils/requset";

// 创建模板
export function GreateDocumentTemplate(data){
    return service.request({
        url: "/documentTemplate/createDocumentTemplate",
        method: "post",
        data
    })
}

// 获取模板列表
export function FindDocumentTemplatePage(data){
    return service.request({
        url: "/documentTemplate/findDocumentTemplatePage",
        method: "post",
        data
    })
}

// 通过id查询文档模板
export function FindDocumentTemplate (data){
    return service.request({
        url: "/documentTemplate/findDocumentTemplate",
        method: "post",
        data
    })
}

// 更新模板
export function UpdateDocumentTemplate  (data){
    return service.request({
        url: "/documentTemplate/updateDocumentTemplate",
        method: "post",
        data
    })
}

// 删除模板
export function DeleteDocumentTemplate  (data){
    return service.request({
        url: "/documentTemplate/deleteDocumentTemplate",
        method: "post",
        data
    })
}