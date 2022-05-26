import {serviceLoc} from "../../../../common/api/requset";

//gitHub--地址
export function  GetCode (data){
    return serviceLoc.request({
        url:'/gitHub/getCode',
        method:'post',
        data
    })
}

//gitHub授权--Code
export function  GetAccessToken (data){
    return serviceLoc.request({
        url:'/gitHub/getAccessToken',
        method:'post',
        data
    })
}


//gitHub--创建凭证
export function  GetProof (data){
    return serviceLoc.request({
        url:'/gitHub/getProof',
        method: 'post',
        data
    })
}

//gitHub--获取所有仓库
export function  GetAllStorehouse (data){
    return serviceLoc.request({
        url:'/gitHub/getAllStorehouse',
        method:'post',
        data
    })
}

//gitHub--分支
export function  GetBranch (data){
    return serviceLoc.request({
        url:'/gitHub/getBranch',
        method:'post',
        data
    })
}

