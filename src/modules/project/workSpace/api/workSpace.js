import {serviceLoc} from "../../../../common/utils/requset";

//节点master上的工作空间
export function  FileTree (data){
    return serviceLoc.request({
        url:"/pipelineWorkSpace/fileTree",
        method: "post",
        data
    })
}

//节点master上的工作空间文件详情
export function  ReadFile (data){
    return serviceLoc.request({
        url:"/pipelineWorkSpace/readFile",
        method: "post",
        data
    })
}

//节点master上的工作空间文件详情
export function  PipelineCensus (data){
    return serviceLoc.request({
        url:"/pipeline/pipelineCensus",
        method: "post",
        data
    })
}