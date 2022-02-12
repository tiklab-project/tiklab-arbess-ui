import {serviceLoc} from "../../../../common/api/requset";

//新建流水线
export function  CreatePipeline(data){
    return serviceLoc.request({
        url:'/pipeline/createPipeline',
        method:'post',
        data
    })
}
//查询所有
export function SelectPipelineQuery(data) {
    return serviceLoc.request({
        url:'/PipelineQuery/selectPipelineQuery',
        method:'post',
        data
    })
}

//创建流水线配置
export function CreatePipelineConfigure(data){
    return serviceLoc.request({
        url:' /pipelineConfigure/createPipelineConfigure',
        method:'post',
        data
    })
}
