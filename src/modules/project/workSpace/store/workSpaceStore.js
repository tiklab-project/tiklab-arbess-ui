import {observable,action} from "mobx";

import {
    GetSubmitMassage,
    FileTree,
    ReadFile,
} from "../api/workSpace";

export class WorkSpaceStore{

    @observable recordList = []
    @observable fileList = []

    @action
    setFileList = value =>{
        this.fileList = value
    }

    @action
    getSubmitMassage = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        GetSubmitMassage(param).then(res=>{
            console.log("近期提交记录",res)
            if(res.code === 0){
                this.recordList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    fileTree = async value =>{
        const params = new FormData()
        params.append("pipelineId",value.pipelineId)
        params.append("userId",value.userId)
        FileTree(params).then(res=>{
            if(res.code === 0){
                this.fileList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    readFile = async value =>{
        const param = new FormData()
        param.append("path",value)
        return await ReadFile(param)
    }

}

export const WORKSPACE_STORE = "workSpaceStore"