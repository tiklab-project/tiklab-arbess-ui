import {action,observable} from "mobx";

import {PipelineCensus} from "../api/Overview";

export class OverviewStore {

    // 运行概况数据
    @observable
    census = ""

    /**
     * 获取运行概况数据
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    pipelineCensus = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve,reject)=>{
            PipelineCensus(param).then(res=>{
                if(res.code===0){
                    this.census = res.data && res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const OVERVIEW_STORE = "OverviewStore"
