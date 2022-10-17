import {observable,action} from "mobx";

import {
    FindAllPipelineStatus,
    CreatePipeline,
    FindLike,
    DeletePipeline,
    UpdatePipeline,
    FindAllFollow,
    UpdateFollow
} from "../api/pipeline";


export class PipelineStore {

    @observable pipelineList = []
    @observable pipelineLength = ""
    @observable followLength = ""
    @observable lastPath = ""
    @observable pipelineId = ""
    @observable pipelineName = ""
    @observable fresh = false
    @observable listType = 1

    @action
    setListType = value =>{
        this.listType = value
    }

    @action
    setLastPath = value =>{
        this.lastPath = value
    }

    @action
    setPipelineId = value =>{
        this.pipelineId = value
    }

    @action
    setPipelineName = value =>{
        this.pipelineName = value
    }

    @action
    setFresh = value =>{
        this.fresh = value
    }

    @action
    findAllPipelineStatus = value =>{
        const param = new FormData()
        param.append("userId",value)
        return new Promise((resolve, reject) => {
            FindAllPipelineStatus(param).then(res=>{
                console.log(res)
                if(res.code===0 && res.data){
                    this.pipelineList=res.data
                    this.pipelineLength=res.data && res.data.length
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })

    }

    @action
    createPipeline = values =>{
        const params = {
            user: {id:values.user.id,},
            pipelineName: values.pipelineName,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        return new Promise((resolve, reject) => {
            CreatePipeline(params).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findLike = values =>{
        const params = new FormData()
        params.append("pipelineName",values.pipelineName)
        params.append("userId",values.userId)
        return new Promise((resolve, reject) => {
            FindLike(params).then(res=>{
                console.log(res)
                if(res.code===0){
                    this.pipelineList=res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //删除流水线
    deletePipeline = async value =>{
        const param = new FormData()
        param.append("pipelineId",value.pipelineId)
        param.append("userId",value.userId)
        return new Promise((resolve, reject) => {
            DeletePipeline(param).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //重命名流水线
    updatePipeline = values =>{
        const params={
            pipelineId:values.pipelineId,
            pipelineName:values.pipelineName,
            user:{id:values.user.id}
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(params).then(res=>{
                console.log( res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findAllFollow = value =>{
        const param = new FormData()
        param.append("userId",value)
        FindAllFollow(param).then(res=>{
            console.log(res)
            if(res.code===0){
                this.pipelineList=res.data
                this.followLength=res.data && res.data.length
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateFollow =async value =>{
        const params = {
            pipeline:{pipelineId:value.pipeline.pipelineId},
            userId:value.userId
        }
        return await UpdateFollow(params)
    }

}

export const PIPELINE_STORE = "pipelineStore"
