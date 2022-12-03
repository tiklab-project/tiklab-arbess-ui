import {serviceLoc} from "../../../../common/utils/requset";


export function  UpdateTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/updateConfig",
        method:"post",
        data
    })
}

export function  DeleteTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/deleteConfig",
        method:"post",
        data
    })
}

export function  CreateTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/createConfig",
        method:"post",
        data
    })
}

export function FindAllTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/findAllTriggerConfig",
        method:"post",
        data
    })
}

export function  OneAllTriggerConfig (data){
    return serviceLoc.request({
        url:"/pipelineTriggerConfig/oneAllTriggerConfig",
        method:"post",
        data
    })
}