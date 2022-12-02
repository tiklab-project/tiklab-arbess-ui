import {serviceLoc} from "../../../../common/utils/requset";


export function  UpdateBeforeConfig (data){
    return serviceLoc.request({
        url:"/pipelineBeforeConfig/updateConfig",
        method:"post",
        data
    })
}

export function  DeleteBeforeConfig (data){
    return serviceLoc.request({
        url:"/pipelineBeforeConfig/deleteConfig",
        method:"post",
        data
    })
}

export function  CreateBeforeConfig (data){
    return serviceLoc.request({
        url:"/pipelineBeforeConfig/createConfig",
        method:"post",
        data
    })
}

export function FindAllBeforeConfig (data){
    return serviceLoc.request({
        url:"/pipelineBeforeConfig/findAllBeforeConfig",
        method:"post",
        data
    })
}

export function  OneAllBeforeConfig (data){
    return serviceLoc.request({
        url:"/pipelineBeforeConfig/oneAllBeforeConfig",
        method:"post",
        data
    })
}