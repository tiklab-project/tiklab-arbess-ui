import {serviceLoc} from "../../../../common/utils/requset";


export function  CreateAfterConfig (data){
    return serviceLoc.request({
        url:"/pipelineAfterConfig/createAfterConfig",
        method:"post",
        data
    })
}

export function  UpdateAfterConfig (data){
    return serviceLoc.request({
        url:"/pipelineAfterConfig/updateAfterConfig",
        method:"post",
        data
    })
}

export function  DeleteAfterConfig (data){
    return serviceLoc.request({
        url:"/pipelineAfterConfig/deleteAfterConfig",
        method:"post",
        data
    })
}

export function  FindAllAfterConfig (data){
    return serviceLoc.request({
        url:"/pipelineAfterConfig/findAllAfterConfig",
        method:"post",
        data
    })
}