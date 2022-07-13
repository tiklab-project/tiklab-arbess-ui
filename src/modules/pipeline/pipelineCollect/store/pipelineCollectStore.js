import {observable,action} from "mobx";

import {
    FindAllFollow,
    UpdateFollow,
} from "../api/pipelineCollect";

export class PipelineCollectStore{

    @observable followList = []

    @action
    findAllFollow = value =>{
        const param = new FormData()
        param.append("userId",value)
        FindAllFollow(param).then(res=>{
            this.followList=res.data
            console.log("查找我的收藏", res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateFollow =async value =>{
        const params = {
            pipeline:{
                pipelineId:value.pipeline
            },
            userId:value.userId
        }
        return await UpdateFollow(params)
    }

}

export const PIPELINECOLLECT_STORE = "pipelineCollectStore"
