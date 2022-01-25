/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-15 13:20:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-15 13:58:10
 */
import {service} from "../../../common/utils/requset";
// 更新分享格式
export function DocumentView(data){
    return service.request({
        url: "/document/view",
        method: "post",
        data
    })
}

// 获取评论
export function CommnetView(data){
    return service.request({
        url: "/comment/view",
        method: "post",
        data
    })
}

// 验证密码
export function VerifyAuthCode(data){
    return service.request({
        url: "/share/verifyAuthCode ",
        method: "post",
        data
    })
}

// 判断是否需要验证码
export function JudgeAuthCode(data){
    return service.request({
        url: "/share/judgeAuthCode  ",
        method: "post",
        data
    })
}