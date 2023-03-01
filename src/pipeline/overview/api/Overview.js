import {serviceLoc} from "../../../common/utils/Requset";

/**
 * 运行概况
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  PipelineCensus (data){
    return serviceLoc.request({
        url:"/overview/pipelineCensus",
        method: "post",
        data
    })
}
