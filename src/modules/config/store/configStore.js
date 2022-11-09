import {observable,action} from "mobx";

import {
    UpdateConfigure,
    FindAllConfigure,
    FileAddress,
    GetFile,
    ConfigValid,
} from "../api/config"

export class ConfigStore{

    @observable profileAddress = ""
    @observable enabledValid = false // 是否启用表单效验
    @observable isPlugin = false // 是否存在插件
    @observable validLength = []
    @observable validType = []

    @action
    setEnabledValid = value =>{
        this.enabledValid = value
    }

    @action
    setValidLength = value =>{
        this.validLength = value
    }

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    updateConfigure = values =>{
        return new Promise((resolve, reject) => {
            UpdateConfigure(values).then(res=>{
                if(res.code===0){
                    this.enabledValid=!this.enabledValid
                }
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
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    fileAddress = () =>{
        FileAddress().then(res=>{
            console.log(res)
            if(res.code===0){
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

    @action
    configValid = async values =>{
        const params = new FormData()
        params.append("pipelineId",values)
        return new Promise((resolve, reject) => {
            ConfigValid(params).then(res=>{
                if(res.code===0){
                    this.validLength = res.data && Object.keys(res.data).length
                    this.validType = res.data && Object.values(res.data)
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }
    
}

export const CONFIG_STORE = "configStore"
