import {observable,action} from "mobx";

import {
    UpdateConfigure,
    FindAllConfigure,
    CodeTestPass,
    FileAddress,
    GetFile,
} from "../api/config"

export class ConfigStore{

    @observable profileAddress = ""
    @observable isAddType = true // ture单个表单能更改，false单个表单不能更改

    @action
    setIsAddType = value =>{
        this.isAddType = value
    }

    @action
    updateConfigure = values =>{
        return new Promise((resolve, reject) => {
            UpdateConfigure(values).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findAllConfigure = values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return new Promise((resolve, reject) => {
            FindAllConfigure(param).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    codeTestPass =async values =>{
        const params = {
            proofId:values.proofId,
            url:values.url,
            port:values.port,
            type:values.type,
        }
        return await CodeTestPass(params)
    }

    @action
    fileAddress = () =>{
        FileAddress().then(res=>{
            console.log(res)
            if(res.code===0 && res.data){
                this.profileAddress = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getFile = async values =>{
        const params = new FormData()
        params.append("pipelineName",values.pipelineName)
        params.append("regex",values.regex)
        return await GetFile(params)
    }
    
}

export const CONFIG_STORE = "configStore"
