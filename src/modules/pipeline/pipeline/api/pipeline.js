import {serviceLoc} from "../../../../common/utils/requset";

//新建流水线
export function  CreatePipeline(data){
    return serviceLoc.request({
        url:'/pipeline/createPipeline',
        method:'post',
        data
    })
}

//查询所有
export function FindAllPipelineStatus(data) {
    return serviceLoc.request({
        url:'/pipelineHome/findUserPipeline',
        method:'post',
        data
    })
}


//搜索流水线
export function FindOneName(data){
    return serviceLoc.request({
        url:'/pipeline/findOneName',
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
