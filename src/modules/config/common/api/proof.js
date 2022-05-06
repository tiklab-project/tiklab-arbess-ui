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




export function  FindOneProof(data){
    return serviceLoc.request({
        url:'/proof/findOneProof',
        method:'post',
        data
    })
}





