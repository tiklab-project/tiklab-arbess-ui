import {action,observable} from "mobx";

import {
    FileTree,
    PipelineCensus,
    ReadFile
} from "../api/workSpace";

export class WorkSpaceStore{

    @observable fileList = []

    @action
    setFileList = value =>{
        this.fileList = value
    }

    @action
    fileTree = async value =>{
        const params = new FormData()
        params.append("pipelineId",value.pipelineId)
        params.append("userId",value.userId)
        const data = await FileTree(params)
        if(data.code===0){
            this.fileList = data.data
        }
        return data
    }

    @action
    readFile = async value =>{
        const param = new FormData()
        param.append("path",value)
        return await ReadFile(param)
    }

    @action
    pipelineCensus = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve,reject)=>{
            PipelineCensus(param).then(res=>{
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const WORKSPACE_STORE = "workSpaceStore"