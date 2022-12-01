import {serviceLoc} from "../../../../common/utils/requset";

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


// 配置文件地址
export function  FileAddress(data){
    return serviceLoc.request({
        url:"/pipelineCommon/fileAddress",
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




