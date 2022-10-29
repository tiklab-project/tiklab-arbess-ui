import {serviceLoc} from "../../../../common/utils/requset";


//创建
export function  CreateAuthorize (data){
    return serviceLoc.request({
        url:"/pipelineAuthorize/createAuthorize",
        method: "post",
        data
    })
}

//创建
export function  UpdateAuthorize (data){
    return serviceLoc.request({
        url:"/pipelineAuthorize/updateAuthorize",
        method: "post",
        data
    })
}

//创建
export function  DeleteAuthorize (data){
    return serviceLoc.request({
        url:"/pipelineAuthorize/deleteAuthorize",
        method: "post",
        data
    })
}

//创建
export function  FindOneAuthorize (data){
    return serviceLoc.request({
        url:"/pipelineAuthorize/findOneAuthorize",
        method: "post",
        data
    })
}

//创建
export function  FindAllAuthorize (data){
    return serviceLoc.request({
        url:"/pipelineAuthorize/findAllAuthorize",
        method: "post",
        data
    })
}