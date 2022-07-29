import {serviceLoc} from "../../../../common/utils/requset";

//查询近期构建记录
export function  GetSubmitMassage (data){
    return serviceLoc.request({
        url:"/matFlowWorkSpace/getSubmitMassage",
        method: "post",
        data
    })
}

//节点master上的工作空间
export function  FileTree (data){
    return serviceLoc.request({
        url:"/matFlowWorkSpace/fileTree",
        method: "post",
        data
    })
}

//节点master上的工作空间文件详情
export function  ReadFile (data){
    return serviceLoc.request({
        url:"/matFlowWorkSpace/readFile",
        method: "post",
        data
    })
}