import {serviceLoc} from "../../../../common/api/requset";

//创建凭证
export function CreateProof(data){
    return serviceLoc.request({
        url:'/proof/createProof',
        method:'post',
        data
    })
}

//所有凭证
export function  FindAllProof(data){
    return serviceLoc.request({
        url:'/proof/findAllProof',
        method:'post',
        data
    })
}

//某一凭证的详细信息
export function  FindOneProof(data){
    return serviceLoc.request({
        url:'/proof/findOneProof',
        method:'post',
        data
    })
}

//
export function  GetState(data){
    return serviceLoc.request({
        url:'/gitee/getState',
        method:'post',
        data
    })
}




