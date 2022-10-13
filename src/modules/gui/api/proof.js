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
export function  FindpipelineProof(data){
    return serviceLoc.request({
        url:"/proof/findpipelineProof",
        method:"post",
        data
    })
}



