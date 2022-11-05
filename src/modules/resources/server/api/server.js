import {serviceLoc} from "../../../../common/utils/requset";

export function CreateAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/createAuthServer",
        method:"post",
        data
    })
}

export function DeleteAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/deleteAuthServer",
        method:"post",
        data
    })
}

export function UpdateAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/updateAuthServer",
        method:"post",
        data
    })
}

export function FindAllAuthServerList(data) {
    return serviceLoc.request({
        url:"/authServer/findAllAuthServerList",
        method:"post",
        data
    })
}