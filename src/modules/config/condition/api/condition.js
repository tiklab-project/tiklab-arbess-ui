import {serviceLoc} from "../../../../common/utils/requset";

export function  CreateCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/createCond",
        method: "post",
        data
    })
}

export function  DeleteCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/deleteCond",
        method: "post",
        data
    })
}

export function  UpdateCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/updateCond",
        method: "post",
        data
    })
}

export function  FindAllTaskCond (data){
    return serviceLoc.request({
        url:"/pipelineCond/findAllTaskCond",
        method: "post",
        data
    })
}