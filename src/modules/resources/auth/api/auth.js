import {serviceLoc} from "../../../../common/utils/requset";

export function CreateAuth(data){
    return serviceLoc.request({
        url:"/auth/createAuth",
        method:"post",
        data
    })
}

export function  DeleteAuth(data){
    return serviceLoc.request({
        url:"/auth/deleteAuth",
        method:"post",
        data
    })
}

export function  UpdateAuth(data){
    return serviceLoc.request({
        url:"/auth/updateAuth",
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



