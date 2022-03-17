import {serviceLoc} from "../../../../common/api/requset";

export function  Url (data){
    return serviceLoc.request({
        url:'/gitee/url',
        method: 'post',
        data
    })
}

export function  Code (data){
    return serviceLoc.request({
        url:'/gitee/code',
        method: 'post',
        data
    })
}