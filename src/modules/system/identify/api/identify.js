import {serviceLoc} from "../../../../common/utils/requset";

export function CreateAuth(data) {
    return serviceLoc.request({
        url:"/pipelineAuth/createAuth",
        method:"post",
        data
    })
}

export function UpdateAuth(data) {
    return serviceLoc.request({
        url:"/pipelineAuth/updateAuth",
        method:"post",
        data
    })
}

export function DeleteAuth(data) {
    return serviceLoc.request({
        url:"/pipelineAuth/deleteAuth",
        method:"post",
        data
    })
}

export function FindAllAuth(data) {
    return serviceLoc.request({
        url:"/pipelineAuth/findAllAuth",
        method:"post",
        data
    })
}