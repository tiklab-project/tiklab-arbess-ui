import {observable,action} from "mobx";

import {
    CreateTaskConfig,
    DeleteTaskConfig,
    UpdateTaskConfig,
    UpdateOrderTaskConfig,
    FindAllTaskConfig,
    ConfigValid,
} from "../api/config";

import {message} from "antd";

export class ConfigStore{

    @observable valid = []
    @observable validType = []
    @observable data = []
    @observable formInitialValues = {} //表单初始化
    @observable opt = 1
    @observable addConfigVisible = false
    @observable isFindConfig = false
    @observable enabledValid = false // 是否启用表单效验
    @observable isPlugin = false // 是否存在插件
    @observable isLoading = false

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
        message.info(value,0.5)
    }

    @observable taskFormDrawer = false
    @observable dataItem = false

    @action
    setTaskFormDrawer = value =>{
        this.taskFormDrawer = value
    }

    @action
    setDataItem = value =>{
        this.dataItem = value
    }

    @action
    createTaskConfig = async values =>{
        const data = await CreateTaskConfig(values)
        if(data.code===0){
            this.mess("添加成功")
            this.isFindConfig=!this.isFindConfig
            this.dataItem = {
                type: values.taskType,
                configId: data.data,
            }
            this.taskFormDrawer = true
        }
        if(data.code===50001){
            this.mess(data.msg)
        }
        return data
    }

    @action
    deleteTaskConfig = async values =>{
        const data = await DeleteTaskConfig(values)
        if(data.code===0){
            this.mess("删除成功")
            this.isFindConfig=!this.isFindConfig
            this.enabledValid=!this.enabledValid
        }
        return data
    }

    @action
    updateTaskConfig = values =>{
        return new Promise((resolve, reject) => {
            UpdateTaskConfig(values).then(res=>{
                if(res.code===0){
                    this.mess("更新成功")
                    this.enabledValid=!this.enabledValid
                    this.isFindConfig=!this.isFindConfig
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    updateOrderTaskConfig = async value =>{
        const data = await UpdateOrderTaskConfig(value)
        if(data.code===0){
            this.mess("更新成功")
            this.isFindConfig=!this.isFindConfig
        }
        return data
    }

    @action
    findAllTaskConfig = values =>{
        this.isLoading = true
        const param = new FormData()
        param.append("pipelineId", values)
        return new Promise((resolve, reject) => {
            FindAllTaskConfig(param).then(res=>{
                if(res.code===0){
                    this.data = res.data===null?[]:res.data
                }
                this.isLoading = false
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
                // const zz = document.getElementById(`${item}`)
                // zz && zz.classList.add("formView-validateFields")
            })
            this.validType = Array.from(new Set(cc && cc))
        }
        return data
    }
    
}

export const CONFIG_STORE = "configStore"