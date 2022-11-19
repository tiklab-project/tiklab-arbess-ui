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
    @observable valid = []
    @observable validType = []
    @observable isFindConfig = false

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    updateConfigure = values =>{
        return new Promise((resolve, reject) => {
            UpdateConfigure(values).then(res=>{
                if(res.code===0){
                    switch (values.message) {
                        case "update":
                        case "updateType":
                            // document.getElementById(Object.keys(values.values)[0]).classList.remove("formView-validateFields")
                            break
                        default:
                            this.isFindConfig=!this.isFindConfig
                    }
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
                    // 需要效验的的表单字段
                    const keys = res.data && Object.keys(res.data)
                    this.valid = keys
                    // 需要效验的类型，存在相同类型需要去重
                    this.validType = Array.from(new Set(res.data && Object.values(res.data)))
                    keys.map(item=>{
                        const zz = document.getElementById(`${item}`)
                        zz && zz.classList.add("formView-validateFields")
                    })
                }
                resolve(res)
            }).catch(error=>{
                reject()
            })
        })
    }
    
}

export const CONFIG_STORE = "configStore"
