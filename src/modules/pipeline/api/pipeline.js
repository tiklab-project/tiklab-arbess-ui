import {serviceLoc} from "../../../common/utils/requset";

//新建流水线
export function CreatePipeline(data){
    return serviceLoc.request({
        url:"/pipeline/createPipeline",
        method:"post",
        data
    })
}

//获取所有流水线
export function FindAllPipelineStatus(data) {
    return serviceLoc.request({
        url:"/pipeline/findUserPipeline",
        method:"post",
        data
    })
}

//模糊搜索流水线
export function FindLike(data){
    return serviceLoc.request({
        url:"/pipeline/findLikePipeline",
        method:"post",
        data
    })
}

//删除流水线
export function DeletePipeline (data){
    return serviceLoc.request({
        url:"/pipeline/deletePipeline",
        method:"post",
        data
    })
}

//重命名流水线
export function UpdatePipeline(data){
    return serviceLoc.request({
        url:"/pipeline/updatePipeline",
        method:"post",
        data
    })
}


//查找我的收藏
export function  FindAllFollow(data){
    return serviceLoc.request({
        url:"/pipeline/findUserFollowPipeline",
        method:"post",
        data
    })
}

//收藏
export function  UpdateFollow(data){
    return serviceLoc.request({
        url:"/pipeline/updateFollow",
        method:"post",
        data
    })
}

//查找系统用户
export function  FindUserPage(data){
    return serviceLoc.request({
        url:"/user/user/findUserPage",
        method:"post",
        data
    })
}

//查找项目用户
export function  FindDmUserPage(data){
    return serviceLoc.request({
        url:"/dmUser/findDmUserPage",
        method:"post",
        data
    })
}
