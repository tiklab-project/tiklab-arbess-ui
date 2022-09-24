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
export function DeleteMatFlowScm(data){
    return serviceLoc.request({
        url:"/scm/deleteMatFlowScm",
        method:"post",
        data
    })
}

//更新环境配置
export function UpdateMatFlowScm(data){
    return serviceLoc.request({
        url:"/scm/updateMatFlowScm",
        method:"post",
        data
    })
}

//查找环境配置
export function FindAllMatFlowScm(data){
    return serviceLoc.request({
        url:"/scm/findAllMatFlowScm",
        method:"post",
        data
    })
}