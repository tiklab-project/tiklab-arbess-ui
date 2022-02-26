import {serviceLoc} from "../../../../common/api/requset";

//构建
export function  FoundPipelineLog (data){
    return serviceLoc.request({
        url:'/pipelineLog/foundPipelineLog',
        method:'post',
        data
    })
}

//查询构建结果
export function  SelectPipelineLog (data){
    return serviceLoc.request({
        url:'/pipelineLog/selectPipelineLog',
        method:'post',
        data
    })
}
