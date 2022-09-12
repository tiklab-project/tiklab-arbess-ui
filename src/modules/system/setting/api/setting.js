import {serviceLoc} from "../../../../common/utils/requset";

//系统信息
export function GetSystemMassage(data){
    return serviceLoc.request({
        url:"/systemMassage/getSystemMassage",
        method:"post",
        data
    })
}

//系统日志
export function GetSystemLog(data){
    return serviceLoc.request({
        url:"/systemMassage/getSystemLog",
        method:"post",
        data
    })
}

//创建环境配置
export function CreateMatFlowPath(data){
    return serviceLoc.request({
        url:"/path/createMatFlowPath",
        method:"post",
        data
    })
}

//删除环境配置
export function DeleteMatFlowPath(data){
    return serviceLoc.request({
        url:"/path/deleteMatFlowPath",
        method:"post",
        data
    })
}

//更新环境配置
export function UpdateMatFlowPath(data){
    return serviceLoc.request({
        url:"/path/updateMatFlowPath",
        method:"post",
        data
    })
}

//查找环境配置
export function FindAllMatFlowPath(data){
    return serviceLoc.request({
        url:"/path/findAllMatFlowPath",
        method:"post",
        data
    })
}