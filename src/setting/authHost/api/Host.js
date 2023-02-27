import {serviceLoc} from "../../../common/utils/Requset";

export function CreateAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/createAuthHost",
        method:"post",
        data
    })
}

export function  DeleteAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/deleteAuthHost",
        method:"post",
        data
    })
}

export function  UpdateAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/updateAuthHost",
        method:"post",
        data
    })
}

export function  FindAllAuthHostList(data){
    return serviceLoc.request({
        url:"/authHost/findAllAuthHostList ",
        method:"post",
        data
    })
}



