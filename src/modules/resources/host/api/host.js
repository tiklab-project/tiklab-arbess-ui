import {serviceLoc} from "../../../../common/utils/requset";

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

export function  FindAllAuthHost (data){
    return serviceLoc.request({
        url:"/authHost/findAllAuthHost ",
        method:"post",
        data
    })
}



