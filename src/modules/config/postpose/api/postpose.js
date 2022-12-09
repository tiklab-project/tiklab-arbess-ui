import {serviceLoc} from "../../../../common/utils/requset";


export function  CreatePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/createPost",
        method:"post",
        data
    })
}

export function  UpdatePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/updatePost",
        method:"post",
        data
    })
}

export function  DeletePostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/deletePost",
        method:"post",
        data
    })
}

export function  FindAllPostConfig (data){
    return serviceLoc.request({
        url:"/pipelinePost/findAllPost",
        method:"post",
        data
    })
}