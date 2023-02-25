import {serviceLoc} from "../../../../../common/utils/requset";

//创建流水线配置
export function  CreateTaskConfig (data){
    return serviceLoc.request({
        url:"/pipelineConfig/createTaskConfig",
        method:"post",
        data
    })
}

//删除流水线配置
export function  DeleteTaskConfig (data){
    return serviceLoc.request({
        url:"/pipelineConfig/deleteTaskConfig",
        method:"post",
        data
    })
}

//更新流水线配置
export function  UpdateTaskConfig (data){
    return serviceLoc.request({
        url:"/pipelineConfig/updateTaskConfig",
        method:"post",
        data
    })
}

//查看所有配置
export function  FindAllTaskConfig(data){
    return serviceLoc.request({
        url:"/pipelineConfig/findAllTaskConfig",
        method:"post",
        data
    })
}

//更改顺序
export function  UpdateOrderTaskConfig(data){
    return serviceLoc.request({
        url:"/pipelineConfig/updateOrderTaskConfig",
        method:"post",
        data
    })
}

// 必填配置是否完善
export function  ConfigValid(data){
    return serviceLoc.request({
        url:"/pipelineConfig/validAllConfig",
        method:"post",
        data
    })
}

// 必填配置是否完善
export function  UpdateStageName(data){
    return serviceLoc.request({
        url:"/pipelineConfig/updateStageName",
        method:"post",
        data
    })
}




