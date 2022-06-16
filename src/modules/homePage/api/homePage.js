import {serviceLoc} from "../../../common/api/requset";

export function  FindAllOpen (data){
    return serviceLoc.request({
        url:'/pipelineHome/findAllOpen',
        method:'post',
        data
    })
}