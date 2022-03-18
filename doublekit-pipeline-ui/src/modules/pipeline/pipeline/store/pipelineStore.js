import {observable, action} from "mobx";
import qs from "qs";

import {
    SelectPipelineStatus,
    CreatePipeline,
    SelectName,
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

    @action
    selectPipelineStatus=()=>{
        SelectPipelineStatus().then(res=>{
            this.pipelineList=res.data.data
            // localStorage.setItem('pipelineList', JSON.stringify(this.pipelineList))
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
            this.pipelineId=res.data.data
            localStorage.setItem('pipelineId', this.pipelineId)
            console.log('创建流水线',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    selectName=values=>{
        const params = qs.stringify({'pipelineName': values})
        return new Promise((resolve, reject) => {
            SelectName(params).then(res=>{
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
