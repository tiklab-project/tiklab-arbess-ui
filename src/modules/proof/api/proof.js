import {serviceLoc} from "../../../common/api/requset";

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

//所有凭证
export function  FindPipelineProof(data){
    return serviceLoc.request({
        url:'/proof/findPipelineProof',
        method:'post',
        data
    })
}

//所有凭证
export function  FindAll(data){
    return serviceLoc.request({
        url:'/proof/findAll',
        method:'post',
        data
    })
}

//更新凭证
export function  UpdateProof(data){
    return serviceLoc.request({
        url:'/proof/updateProof',
        method:'post',
        data
    })
}

//删除凭证
export function  DeleteProof(data){
    return serviceLoc.request({
        url:'/proof/deleteProof',
        method:'post',
        data
    })
}




