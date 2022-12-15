import {serviceLoc} from "../../../../common/utils/requset";

export function CreateVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/createVariable",
        method:"post",
        data
    })
}

export function DeleteVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/deleteVariable",
        method:"post",
        data
    })
}

export function UpdateVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/updateVariable",
        method:"post",
        data
    })
}

export function FindAllVariable(data){
    return serviceLoc.request({
        url:"/pipelineVariable/findAllVariable",
        method:"post",
        data
    })
}