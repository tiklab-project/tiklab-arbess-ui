import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 系统信息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function GetSystemMassage(data){
    return serviceLoc.request({
        url:"/systemMassage/getSystemMassage",
        method:"post",
        data
    })
}
