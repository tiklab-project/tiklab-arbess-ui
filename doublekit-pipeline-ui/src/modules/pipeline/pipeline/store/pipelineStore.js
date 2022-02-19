import {observable, action} from "mobx";

import {
    SelectPipelineStatus,
    CreatePipeline,
    CreatePipelineConfigure,
    SelectName
} from "../api/pipeline";
import qs from "qs";

class PipelineStore{
    constructor(store) {
        this.store=store
    }
    @observable pipelineList=[]
    @observable searchPipelineList = []
    @observable allProof=[]
    @observable proofName=''

    //所有流水线
    @action
    selectPipelineStatus=()=>{
        SelectPipelineStatus().then(res=>{
            this.pipelineList=res.data.data
            localStorage.setItem('pipelineList',JSON.stringify(this.pipelineList))
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
                localStorage.setItem('pipelineId',res.data.data)
                console.log('所有流水线',res)
                // this.selectPipelineStatus()
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    createPipelineConfigure=values=>{
        let param = {
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:values.configureCreateTime,
            pipelineId:  values.pipelineId,
            proofId:values.proofId
        }
        CreatePipelineConfigure(param).then(res=>{
            localStorage.setItem('configureId',res.data.data)
        }).catch(error=>{
            console.log(error)
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
                localStorage.setItem('searchPipelineList',JSON.stringify(this.searchPipelineList))
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
