import {serviceLoc} from "../../../common/utils/Requset";

//历史详情日志
export function  FindAllLog (data){
    return serviceLoc.request({
        url:"/pipelineLog/findAllLog",
        method:"post",
        data
    })
}

//构建历史
export function  FindPageHistory (data){
    return serviceLoc.request({
        url:"/pipelineHistory/findPageHistory",
        method:"post",
        data
    })
}

//删除构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:"/pipelineHistory/deleteHistory",
        method:"post",
        data
    })
}
