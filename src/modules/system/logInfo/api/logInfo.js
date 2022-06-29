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
