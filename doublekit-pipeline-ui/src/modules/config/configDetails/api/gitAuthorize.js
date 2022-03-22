import {serviceLoc} from "../../../../common/api/requset";

//gitee授权地址
export function  Url (data){
    return serviceLoc.request({
        url:'/gitee/url',
        method: 'post',
        data
    })
}

//gitee授权Code
export function  Code (data){
    return serviceLoc.request({
        url:'/gitee/code',
        method: 'post',
        data
    })
}

//gitee仓库
export function  GetAllStorehouse (data){
    return serviceLoc.request({
        url:'/gitee/getAllStorehouse',
        method: 'post',
        data
    })
}

//gitee分支
export function  GetBranch (data){
    return serviceLoc.request({
        url:'/gitee/getBranch',
        method: 'post',
        data
    })
}

//凭证Id
export function  GetProof (data){
    return serviceLoc.request({
        url:'/gitee/getProof',
        method: 'post',
        data
    })
}