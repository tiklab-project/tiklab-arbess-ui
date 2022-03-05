import {serviceLoc} from "../../../common/api/requset";

//创建凭证
export function CreateProof(data){
    return serviceLoc.request({
        url:'/proof/createProof',
        method:'post',
        data
    })
}

//添加后查看凭证
export function SelectAllProof(data){
    return serviceLoc.request({
        url:'/proof/selectAllProof',
        method:'post',
        data
    })
}

//查看凭证名名称
export function  SelectProofName(data){
    return serviceLoc.request({
        url:'/proof/selectProofName',
        method:'post',
        data
    })
}