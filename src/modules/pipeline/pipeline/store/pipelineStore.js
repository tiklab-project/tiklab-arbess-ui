import {observable,action} from "mobx";

import {
    FindAllPipelineStatus,
    CreatePipeline,
    FindOneName,
    DeletePipeline,
    UpdatePipeline
} from "../api/pipeline";

export class PipelineStore{
    
    @observable pipelineList=[]
    @observable searchPipelineList = []
    @observable lastPath = ""
    @observable pipelineId = ""
    @observable pipelineName = ""

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
    findAllPipelineStatus = value =>{
        const param = new FormData()
        param.append("userId",value)
        return new Promise((resolve, reject) => {
            FindAllPipelineStatus(param).then(res=>{
                if(res.code === 0 ){
                    this.pipelineList=res.data
                }
                resolve(res)
                console.log("所有流水线", res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })

    }

    @action
    createPipeline = values =>{
        const params = {
            user: {
                id:values.user.id,
            },
            pipelineName: values.pipelineName,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        return new Promise((resolve, reject) => {
            CreatePipeline(params).then(res=>{
                console.log("创建流水线",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findOneName = values =>{
        const params = new FormData()
        params.append("pipelineName",values.pipelineName)
        params.append("userId",values.userId)
        return new Promise((resolve, reject) => {
            FindOneName(params).then(res=>{
                this.searchPipelineList=res.data
                console.log("搜索流水线",res)
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
                console.log("删除流水线",res)
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
            user:{
                id: values.user.id
            }
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(params).then(res=>{
                console.log("重命名",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const PIPELINE_STORE = "pipelineStore"
