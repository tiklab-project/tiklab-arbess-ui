import {serviceLoc} from "../../../common/utils/Requset";

//节点master上的工作空间文件详情
export function  PipelineCensus (data){
    return serviceLoc.request({
        url:"/pipeline/pipelineCensus",
        method: "post",
        data
    })
}
