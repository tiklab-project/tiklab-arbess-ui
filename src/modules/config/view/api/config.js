import {serviceLoc} from "../../../../common/utils/requset";

//创建流水线配置
export function  CreateConfig (data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/createConfig",
        method:"post",
        data
    })
}

//删除流水线配置
export function  DeleteConfig (data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/deleteConfig",
        method:"post",
        data
    })
}

//更新流水线配置
export function  UpdateConfigure (data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/updateConfig",
        method:"post",
        data
    })
}

//查看所有配置
export function  FindAllConfigure(data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/findAllConfig",
        method:"post",
        data
    })
}

//更改顺序
export function  UpdateOrderConfig(data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/updateOrderConfig",
        method:"post",
        data
    })
}

// 必填配置是否完善
export function  ConfigValid(data){
    return serviceLoc.request({
        url:"/pipelineCourseConfig/configValid",
        method:"post",
        data
    })
}




