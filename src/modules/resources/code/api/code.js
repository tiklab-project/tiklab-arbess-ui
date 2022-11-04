import {serviceLoc} from "../../../../common/utils/requset";

export function CreateAuthCode(data){
    return serviceLoc.request({
        url:"/authCode/createAuthCode",
        method:"post",
        data
    })
}

export function  DeleteAuthCode(data){
    return serviceLoc.request({
        url:"/authCode/deleteAuthCode",
        method:"post",
        data
    })
}

export function  UpdateAuthCode(data){
    return serviceLoc.request({
        url:"/authCode/updateAuthCode",
        method:"post",
        data
    })
}

export function  FindAllAuthCodeList (data){
    return serviceLoc.request({
        url:"/authCode/findAllAuthCodeList ",
        method:"post",
        data
    })
}



