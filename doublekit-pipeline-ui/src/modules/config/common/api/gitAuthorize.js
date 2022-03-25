import {serviceLoc} from "../../../../common/api/requset";

//gitee授权地址
export function  Url (data){
    return serviceLoc.request({
        url:'/gitee/url',
        method: 'post',
        data
    })
}

//gitee授权--Code
export function  Code (data){
    return serviceLoc.request({
        url:'/gitee/code',
        method: 'post',
        data
    })
}

//gitee--仓库
export function  GetAllStorehouse (data){
    return serviceLoc.request({
        url:'/gitee/getAllStorehouse',
        method: 'post',
        data
    })
}

//gitee--分支
export function  GetBranch (data){
    return serviceLoc.request({
        url:'/gitee/getBranch',
        method: 'post',
        data
    })
}

//gitee--用户名
export function  GetUserMessage (data){
    return serviceLoc.request({
        url:'/gitee/getUserMessage',
        method: 'post',
        data
    })
}

