import {observable, action} from "mobx";

import {
    SelectPipelineStatus,
    CreatePipeline,
    SelectName,
    DeletePipeline,
    UpdatePipeline
} from "../api/pipeline";
import qs from "qs";


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
            console.log('所有流水线',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    createPipeline=values=>{
        let param = {
            pipelineName: values.pipelineName,
            pipelineCreateUser: values.pipelineCreateUser,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        return new Promise((resolve, reject) => {
            CreatePipeline(param).then(res=>{
                this.pipelineId=res.data.data
                localStorage.setItem('pipelineId', this.pipelineId)
                console.log('创建流水线',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    selectName=values=>{
        let param = {
            pipelineName: values.pipelineName,
        }
        return new Promise((resolve, reject) => {
            SelectName(param).then(res=>{
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
    deletePipeline=(values)=>{
        const params = qs.stringify({'pipelineId': values})
        DeletePipeline(params).then(res=>{
            console.log('删除流水线',res)
        }).catch(error=>{
            console.log(error)
        })

    }

    @action
    updatePipeline=(values)=>{
        let param={
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
