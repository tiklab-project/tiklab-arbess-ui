import {observable, action} from "mobx";

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

    @observable pipeline = {}

    @action
    setPipeline = value =>{
        this.pipeline = value
    }

    @action
    findAllPipelineStatus = value =>{
        const param = new FormData()
        param.append('userId',value)
        FindAllPipelineStatus(param).then(res=>{
            this.pipelineList=res.data
            console.log('所有流水线', res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    createPipeline=values=>{
        const params = {
            userId:values.userId,
            pipelineName: values.pipelineName,
            pipelineCreateUser: values.pipelineCreateUser,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        return new Promise((resolve, reject) => {
            CreatePipeline(params).then(res=>{
                console.log('创建流水线',res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findOneName=value=>{
        const param = new FormData()
        param.append('pipelineName',value)
        return new Promise((resolve, reject) => {
            FindOneName(param).then(res=>{
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
    deletePipeline= value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        DeletePipeline(param).then(res=>{
            console.log('删除流水线',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updatePipeline=values=>{
        const params={
            pipelineId:values.pipelineId,
            pipelineName:values.pipelineName,
            pipelineCollect:values.pipelineCollect
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(params).then(res=>{
                console.log('重命名',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const PIPELINE_STORE = 'pipelineStore'
