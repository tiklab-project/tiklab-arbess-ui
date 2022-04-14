import {serviceLoc} from "../../../../common/api/requset";

//创造源码管理
export function  CreateCode (data){
    return serviceLoc.request({
        url:'/code/createCode',
        method:'post',
        data
    })
}

//更新流水线配置
export function  UpdateConfigure (data){
    return serviceLoc.request({
        url:'/pipelineConfigure/updateConfigure',
        method:'post',
        data
    })
}


export function  CreateTest (data){
    return serviceLoc.request({
        url:'/test/createTest',
        method:'post',
        data
    })
}

export function  CreateStructure (data){
    return serviceLoc.request({
        url:'/structure/createStructure',
        method:'post',
        data
    })
}


//
export function  CreateDeploy (data){
    return serviceLoc.request({
        url:'/deploy/createDeploy',
        method:'post',
        data
    })
}
