import {serviceLoc} from "../../../../common/api/requset";

//创建凭证
export function CreateProof(data){
    return serviceLoc.request({
        url:'/proof/createProof',
        method:'post',
        data
    })
}

//查看所有部署凭证信息
export function  FindAllGitProof(data){
    return serviceLoc.request({
        url:'/proof/findAllGitProof',
        method:'post',
        data
    })
}

//获取源码凭证名称
export function  FindOneProof(data){
    return serviceLoc.request({
        url:'/proof/findOneProof',
        method:'post',
        data
    })
}

//查看所有部署凭证信息
export function  FindAllDeployProof(data){
    return serviceLoc.request({
        url:'/proof/findAllDeployProof',
        method:'post',
        data
    })
}



