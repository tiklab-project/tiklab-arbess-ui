import {serviceLoc} from "../../../common/utils/requset";




// 认证配置
export function CreateAuth(data){
    return serviceLoc.request({
        url:"/auth/createAuth",
        method:"post",
        data
    })
}

export function  FindAllAuth(data){
    return serviceLoc.request({
        url:"/auth/findAllAuth",
        method:"post",
        data
    })
}

// 主机配置
export function CreateAuthHost(data){
    return serviceLoc.request({
        url:"/authHost/createAuthHost",
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

// 服务配置
export function CreateAuthServer(data) {
    return serviceLoc.request({
        url:"/authServer/createAuthServer",
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