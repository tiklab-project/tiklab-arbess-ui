import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 运行概况
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  PipelineCensus (data){
    return serviceLoc.request({
        url:"/pipeline/pipelineCensus",
        method: "post",
        data
    })
}
