import {serviceLoc} from "../../../../common/utils/requset";


//创建
export function  CreateThirdAddress (data){
    return serviceLoc.request({
        url:"/pipelineThirdAddress/createThirdAddress",
        method: "post",
        data
    })
}

//更新
export function  UpdateThirdAddress (data){
    return serviceLoc.request({
        url:"/pipelineThirdAddress/updateThirdAddress",
        method: "post",
        data
    })
}

//删除
export function  DeleteThirdAddress (data){
    return serviceLoc.request({
        url:"/pipelineThirdAddress/deleteThirdAddress",
        method: "post",
        data
    })
}

//查找
export function  FindAllThirdAddress (data){
    return serviceLoc.request({
        url:"/pipelineThirdAddress/findAllThirdAddress",
        method: "post",
        data
    })
}