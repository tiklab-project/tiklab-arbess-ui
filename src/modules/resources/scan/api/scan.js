import {serviceLoc} from "../../../../common/utils/requset";

export function CreateAuthCodeScan(data){
    return serviceLoc.request({
        url:"/authCodeScan/createAuthCodeScan",
        method:"post",
        data
    })
}

export function  DeleteAuthCodeScan(data){
    return serviceLoc.request({
        url:"/authCodeScan/deleteAuthCodeScan",
        method:"post",
        data
    })
}

export function  UpdateAuthCodeScan(data){
    return serviceLoc.request({
        url:"/authCodeScan/updateAuthCodeScan",
        method:"post",
        data
    })
}

export function  FindAllAuthCodeScan (data){
    return serviceLoc.request({
        url:"/authCodeScan/findAllAuthCodeScan ",
        method:"post",
        data
    })
}



