import {serviceLoc} from "../../../common/api/requset";


//查询近期构建记录
export function  GetSubmitMassage (data){
    return serviceLoc.request({
        url:'/gitCommit/getSubmitMassage',
        method: 'post',
        data
    })
}

//查询近期构建记录
export function  FileTree (data){
    return serviceLoc.request({
        url:'/pipelineExec/fileTree',
        method: 'post',
        data
    })
}