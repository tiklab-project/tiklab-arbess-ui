import {serviceLoc} from "../../../common/api/requset";


//查询近期构建记录
export function  GetSubmitMassage (data){
    return serviceLoc.request({
        url:'/commit/getSubmitMassage',
        method: 'post',
        data
    })
}