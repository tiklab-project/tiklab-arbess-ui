import {serviceLoc} from "../../../common/api/requset";

//创建流水线配置
export function CreatePipelineConfigure(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/createPipelineConfigure',
        method:'post',
        data
    })
}