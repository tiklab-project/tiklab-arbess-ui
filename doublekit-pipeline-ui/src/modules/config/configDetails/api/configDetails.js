import {serviceLoc} from "../../../../common/api/requset";

//查找流水线配置
export function  CreateCode (data){
    return serviceLoc.request({
        url:'/code/createCode',
        method:'post',
        data
    })
}
