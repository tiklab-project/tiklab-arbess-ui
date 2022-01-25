/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-21 15:25:35
 */
import {serviceLoc,service} from "../../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindWikiCatalogue(data){
    return service.request({
        url: "/category/findCategoryListTree",
        method: "post",
        data
    })
}

export function AddWikiCatalogue(data){
    return service.request({
        url: "/category/createCategory",
        method: "post",
        data
    })
}

//更新目录
export function UpdateWikiCatalogue(data){
    return service.request({
        url: "/category/updateCategory",
        method: "post",
        data
    })
}

// // 根据id查找目录
// export function FindWikiCatalogueById(data){
//     return service.request({
//         url: "/category/findCategory",
//         method: "post",
//         data
//     })
// }

export function DetailWikiLog(data){
    return service.request({
        url: "/category/findCategory",
        method: "post",
        data
    })
}

// 删除目录
export function DeleteWikiLog(data){
    return service.request({
        url: "/category/deleteCategory",
        method: "post",
        data
    })
}

// 创建文档
export function AddWikiCataDocument(data){
    return service.request({
        url: "/document/createDocument",
        method: "post",
        data
    })
}
// 更新文档
export function UpdateDocument(data){
    return service.request({
        url: "/document/updateDocument",
        method: "post",
        data
    })
}
// 获取文档
export function FindDocument(data){
    return service.request({
        url: "/document/findDocument",
        method: "post",
        data
    })
}

// 上传附件
export function Upload(data){
    return service.request({
        url: "/dfs/upload",
        method: "post",
        data
    })
}

// 删除文档
export function DeleteDocument(data){
    return service.request({
        url: "/document/deleteDocument",
        method: "post",
        data
    })
}

// 根据id 查找目录的第一级文档
export function FindCategoryDocument(data){
    return service.request({
        url: "/category/findCategoryDocument",
        method: "post",
        data
    })
}

// 根据id 查找知识库成员
export function FindDmPrjRolePage(data){
    return service.request({
        url: "/dmUser/findDmUserPage",
        method: "post",
        data
    })
}