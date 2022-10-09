import {serviceLoc} from "../../../common/utils/requset";

//更新流水线配置
export function  UpdateConfigure (data){
    return serviceLoc.request({
        url:"/pipelineConfig/updateConfig",
        method:"post",
        data
    })
}

//查看所有配置
export function  FindAllConfigure(data){
    return serviceLoc.request({
        url:"/pipelineConfig/findAllConfig",
        method:"post",
        data
    })
}

// 测试配置
export function  CodeTestPass(data){
    return serviceLoc.request({
        url:"/codeCheck/checkAuth",
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

// linux应用源文件地址
export function  GetFile(data){
    return serviceLoc.request({
        url:"/pipelineCommon/getFile",
        method:"post",
        data
    })
}




