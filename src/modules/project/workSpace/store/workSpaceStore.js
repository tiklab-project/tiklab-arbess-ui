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
        param.append("matFlowId",value)
        GetSubmitMassage(param).then(res=>{
            console.log( res)
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
        params.append("matFlowId",value.matFlowId)
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

}

export const WORKSPACE_STORE = "workSpaceStore"