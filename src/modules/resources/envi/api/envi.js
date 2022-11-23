import {serviceLoc} from "../../../../common/utils/requset";

//系统信息
export function GetSystemMassage(data){
    return serviceLoc.request({
        url:"/systemMassage/getSystemMassage",
        method:"post",
        data
    })
}

//删除环境配置
export function DeletePipelineScm(data){
    return serviceLoc.request({
        url:"/scm/deletePipelineScm",
        method:"post",
        data
    })
}

//更新环境配置
export function UpdatePipelineScm(data){
    return serviceLoc.request({
        url:"/scm/updatePipelineScm",
        method:"post",
        data
    })
}

//查找环境配置
export function FindAllPipelineScm(data){
    return serviceLoc.request({
        url:"/scm/findAllPipelineScm",
        method:"post",
        data
    })
}