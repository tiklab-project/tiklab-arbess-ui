/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-10 15:59:46
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-15 11:21:43
 */
import {service} from "../../../../common/utils/requset";

// 添加评论
export function CreateComment(data){
    return service.request({
        url: "/comment/createComment",
        method: "post",
        data
    })
}

// 添加评论
export function FindCommentPage(data){
    return service.request({
        url: "/comment/findCommentList",
        method: "post",
        data
    })
}

// 添加点赞
export function CreateLike(data){
    return service.request({
        url: "/like/createLike",
        method: "post",
        data
    })
}

// 创建分享
export function CreateShare(data){
    return service.request({
        url: "/share/addShare",
        method: "post",
        data
    })
}

// 更新分享格式
export function UpdateShare(data){
    return service.request({
        url: "/share/cutHaveOrNotAuthCode",
        method: "post",
        data
    })
}