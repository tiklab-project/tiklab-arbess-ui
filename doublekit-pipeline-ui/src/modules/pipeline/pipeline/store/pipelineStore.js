import {observable, action} from "mobx";
import qs from "qs";

import {
    SelectPipelineStatus,
    CreatePipeline,
    SelectName
} from "../api/pipeline";


class PipelineStore{
    constructor(store) {
        this.store=store
    }
    @observable pipelineList=[]
    @observable searchPipelineList = []

    //所有流水线
    @action
    selectPipelineStatus=()=>{
        return new Promise((resolve, reject) => {
            SelectPipelineStatus().then(res=>{
                this.pipelineList=res.data.data
                localStorage.setItem('pipelineList', JSON.stringify(this.pipelineList))
                console.log('所有流水线',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
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
                localStorage.setItem('pipelineId',res.data.data)
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
}

export default PipelineStore
