import {observable,action} from "mobx";

import {
    CreateConfig,
    DeleteConfig,
    UpdateConfigure,
    UpdateOrderConfig,
    FindAllConfigure,
    ConfigValid,
} from "../api/config";

import {message} from "antd";

export class ConfigStore{

    @observable enabledValid = false // 是否启用表单效验
    @observable isPlugin = false // 是否存在插件
    @observable valid = []
    @observable validType = []
    @observable data = []
    @observable opt = 1
    @observable isFindConfig = false
    @observable formInitialValues = {} //表单初始化

    @observable addConfigVisible = false

    @action
    setData = value =>{
        this.data = value
    }

    @action
    setAddConfigVisible = value =>{
        this.addConfigVisible = value
    }

    @action
    setFormInitialValues = value =>{
        this.formInitialValues = value
    }

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    setOpt = value =>{
        this.opt = value
    }

    @action
    setIsFindConfig = value =>{
        this.isFindConfig = value
    }

    @action
    mess = value =>{
        message.info(value,1.5)
    }

    @action
    createConfig = async values =>{
        const data = await CreateConfig(values)
        if(data.code===0){
            this.mess("添加成功")
            this.isFindConfig=!this.isFindConfig
            this.enabledValid=!this.enabledValid
        }
        if(data.code===50001){
            this.mess(data.msg)
        }
        return data
    }

    @action
    deleteConfig = async values =>{
        const params = new FormData()
        params.append("configId",values)
        const data = await DeleteConfig(params)
        if(data.code===0){
            this.mess("删除成功")
            this.isFindConfig=!this.isFindConfig
            this.enabledValid=!this.enabledValid
        }
        return data
    }

    @action
    updateConfigure = values =>{
        return new Promise((resolve, reject) => {
            UpdateConfigure(values).then(res=>{
                if(res.code===0){
                    this.mess("更新成功")
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
    updateOrderConfig = async value =>{
        const data = await UpdateOrderConfig(value)
        if(data.code===0){
            this.mess("更新成功")
            this.isFindConfig=!this.isFindConfig
        }
        return data
    }

    @action
    findAllConfigure = values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return new Promise((resolve, reject) => {
            FindAllConfigure(param).then(res=>{
                if(res.code===0){
                    this.data = res.data && res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    configValid =async values =>{
        const params = new FormData()
        params.append("pipelineId",values)
        const data = await ConfigValid(params)
        if(data.code===0){
            this.valid = data.data && data.data
            const cc = []
            data.data && data.data.map(item=>{
                cc.push(item.split("_")[0])
                const zz = document.getElementById(`${item}`)
                zz && zz.classList.add("formView-validateFields")
            })
            this.validType = Array.from(new Set(cc && cc))
        
        }
        return data
    }
    
}

export const CONFIG_STORE = "configStore"
