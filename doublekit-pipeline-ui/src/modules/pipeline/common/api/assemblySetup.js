import {serviceLoc} from "../../../../common/api/requset";

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