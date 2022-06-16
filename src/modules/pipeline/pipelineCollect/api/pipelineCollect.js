import {serviceLoc} from "../../../../common/api/requset";

//查找我的收藏
export function  FindAllFollow(data){
    return serviceLoc.request({
        url:'/pipelineHome/findAllFollow',
        method:'post',
        data
    })
}

//收藏
export function  UpdateFollow(data){
    return serviceLoc.request({
        url:'/pipelineHome/updateFollow',
        method:'post',
        data
    })
}
