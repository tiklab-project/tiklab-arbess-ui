import {serviceLoc} from "../../../common/api/requset";

//创建流水线配置
export function CreatePipelineConfigure(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/createPipelineConfigure',
        method:'post',
        data
    })
}

//查找流水线配置
export function  SelectPipelineConfig (data){
    return serviceLoc.request({
        url:'/pipelineConfigure/selectPipelineConfig',
        method:'post',
        data
    })
}

//更改流水线配置
export function  UpdatePipelineConfig(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/updatePipelineConfig',
        method:'post',
        data
    })
}
