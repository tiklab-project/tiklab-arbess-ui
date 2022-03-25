import {observable, action} from "mobx";
import qs from "qs";

import {
    FindAllPipelineStatus,
    CreatePipeline,
    FindOneName,
    DeletePipeline,
    UpdatePipeline
} from "../api/pipeline";

class PipelineStore{
    constructor(store) {
        this.store=store
    }
    @observable pipelineList=[]
    @observable searchPipelineList = []
    @observable pipelineId=''
    @observable configureId=''
    @observable codeId=''
    @observable testId=''
    @observable structureId=''
    @observable deployId=''

    @action
    findAllPipelineStatus=()=>{
        FindAllPipelineStatus().then(res=>{
            this.pipelineList=res.data.data
            console.log('所有流水线', this.pipelineList)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    createPipeline=values=>{
        const param = {
            pipelineName: values.pipelineName,
            pipelineCreateUser: values.pipelineCreateUser,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        CreatePipeline(param).then(res=>{
            if(res.data.data){
                this.pipelineId=res.data.data.pipelineId
                this.configureId=res.data.data.configureId
                this.codeId=res.data.data.codeId
                this.testId=res.data.data.testId
                this.structureId=res.data.data.structureId
                this.deployId=res.data.data.deployId
            }
            localStorage.setItem('pipelineId', this.pipelineId)
            localStorage.setItem('configureId', this.configureId)
            localStorage.setItem('codeId', this.codeId)
            localStorage.setItem('testId', this.testId)
            localStorage.setItem('structureId', this.structureId)
            localStorage.setItem('deployId', this.deployId)
            console.log('创建流水线',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findOneName=values=>{
        const params = qs.stringify({'pipelineName': values})
        return new Promise((resolve, reject) => {
            FindOneName(params).then(res=>{
                this.searchPipelineList=res.data.data
                // localStorage.setItem('searchPipelineList',JSON.stringify(this.searchPipelineList))
                console.log("搜索流水线",res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //删除流水线
    deletePipeline=values=>{
        const params = qs.stringify({'pipelineId': values})
        DeletePipeline(params).then(res=>{
            console.log('删除流水线',res)
        }).catch(error=>{
            console.log(error)
        })

    }

    @action
    updatePipeline=values=>{
        const param={
            pipelineId:values.pipelineId,
            pipelineName:values.pipelineName
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(param).then(res=>{
                console.log('重命名',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }
}

export default PipelineStore
