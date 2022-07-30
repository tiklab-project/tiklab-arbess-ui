import {observable,action} from "mobx";

import {
    FindAllFollow,
    UpdateFollow,
} from "../api/matFlowCollect";

export class MatFlowCollectStore{

    @observable followList = []

    @action
    findAllFollow = value =>{
        const param = new FormData()
        param.append("userId",value)
        FindAllFollow(param).then(res=>{
            if(res.code===0){
                this.followList=res.data
            }
            console.log("查找我的收藏", res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateFollow =async value =>{
        const params = {
            matFlow:{matflowId:value.matFlow.matflowId},
            userId:value.userId
        }
        return await UpdateFollow(params)
    }

}

export const MATFLOWCOLLECT_STORE = "matFlowCollectStore"
