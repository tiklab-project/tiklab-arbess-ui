import {serviceLoc} from "../../../../common/api/requset";

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




