import {serviceLoc} from "../../../../common/api/requset";

//查找流水线配置
export function  FindOnePipelineConfigure (data){
    return serviceLoc.request({
        url:'/pipelineConfigure/findOnePipelineConfigure',
        method:'post',
        data
    })
}

//更改流水线配置
export function  UpdatePipelineConfig(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/updatePipelineConfigure',
        method:'post',
        data
    })
}
