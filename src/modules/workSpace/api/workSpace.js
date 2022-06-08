import {serviceLoc} from "../../../common/api/requset";


//查询近期构建记录
export function  GetSubmitMassage (data){
    return serviceLoc.request({
        url:'/gitCommit/getSubmitMassage',
        method: 'post',
        data
    })
}

//节点master上的工作空间
export function  FileTree (data){
    return serviceLoc.request({
        url:'/pipelineExec/fileTree',
        method: 'post',
        data
    })
}

//节点master上的工作空间文件详情
export function  ReadFile (data){
    return serviceLoc.request({
        url:'/pipelineExec/readFile',
        method: 'post',
        data
    })
}