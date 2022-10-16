import {serviceLoc} from "../../../common/utils/requset";

//创建凭证
export function CreateProof(data){
    return serviceLoc.request({
        url:"/proof/createProof",
        method:"post",
        data
    })
}

//凭证
export function  FindPipelineProof(data){
    return serviceLoc.request({
        url:"/proof/findPipelineProof",
        method:"post",
        data
    })
}



