import {serviceLoc} from "../../../common/utils/requset";

//授权--Code
export function  FindCode (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findCode",
        method: "post",
        data
    })
}

//授权--获取token
export function  FindAccessToken (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findAccessToken",
        method: "post",
        data
    })
}

//授权--获取仓库
export function  FindAllStorehouse (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findAllStorehouse",
        method: "post",
        data
    })
}

//授权--获取分支
export function  FindBranch (data){
    return serviceLoc.request({
        url:"/codeAuthorize/findBranch",
        method: "post",
        data
    })
}

