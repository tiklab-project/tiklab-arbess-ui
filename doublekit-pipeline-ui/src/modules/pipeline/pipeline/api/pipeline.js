import {serviceLoc} from "../../../../common/api/requset";

//新建流水线
export function  CreatePipeline(data){
    return serviceLoc.request({
        url:'/pipeline/createPipeline',
        method:'post',
        data
    })
}
//创建流水线配置
export function CreatePipelineConfigure(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/createPipelineConfigure',
        method:'post',
        data
    })
}

//查询所有
export function SelectPipelineStatus(data) {
    return serviceLoc.request({
        url:'/pipeline/selectPipelineStatus',
        method:'post',
        data
    })
}


//搜索流水线
export function SelectName(data){
    return serviceLoc.request({
        url:'/pipeline/selectName',
        method:'post',
        data
    })
}

//删除流水线
export function  DeletePipeline (data){
    return serviceLoc.request({
        url:'/pipeline/deletePipeline',
        method:'post',
        data
    })
}

//重命名流水线
export function UpdatePipeline(data){
    return serviceLoc.request({
        url:'/pipeline/updatePipeline',
        method:'post',
        data
    })
}
