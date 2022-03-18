import {serviceLoc} from "../../../../common/api/requset";

//git授权地址
export function  Url (data){
    return serviceLoc.request({
        url:'/gitee/url',
        method: 'post',
        data
    })
}

//git授权Code
export function  Code (data){
    return serviceLoc.request({
        url:'/gitee/code',
        method: 'post',
        data
    })
}

export function  GetAllStorehouse (data){
    return serviceLoc.request({
        url:'gitee/getAllStorehouse',
        method: 'post',
        data
    })
}