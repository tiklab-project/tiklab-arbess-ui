import {serviceLoc} from "../../../common/api/requset";

export function  FindAllOpen (data){
    return serviceLoc.request({
        url:'/pipelineHome/findAllOpen',
        method:'post',
        data
    })
}

export function  RunState (data){
    return serviceLoc.request({
        url:'/pipelineHome/runState',
        method:'post',
        data
    })
}