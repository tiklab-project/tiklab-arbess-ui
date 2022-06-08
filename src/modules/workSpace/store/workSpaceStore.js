import {observable,action} from "mobx";

import {
    GetSubmitMassage,
    FileTree,
    ReadFile,
} from "../api/workSpace";

export class WorkSpaceStore{

    @observable recordList = []

    @action
    getSubmitMassage = async value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        GetSubmitMassage(param).then(res=>{
            console.log('近期提交记录',res)
            this.recordList = res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    fileTree = async value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        const data = await FileTree(param)
        return data.data
    }

    @action
    readFile = async value =>{
        const param = new FormData()
        param.append('path',value)
        const data = await ReadFile(param)
        return data.data
    }

}

export const WORKSPACE_STORE = 'workSpaceStore'