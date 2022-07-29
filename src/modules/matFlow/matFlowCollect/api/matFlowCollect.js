import {serviceLoc} from "../../../../common/utils/requset";

//查找我的收藏
export function  FindAllFollow(data){
    return serviceLoc.request({
        url:"/matFlowHome/findAllFollow",
        method:"post",
        data
    })
}

//收藏
export function  UpdateFollow(data){
    return serviceLoc.request({
        url:"/matFlowHome/updateFollow",
        method:"post",
        data
    })
}
