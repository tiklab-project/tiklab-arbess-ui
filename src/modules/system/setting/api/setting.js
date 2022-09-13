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