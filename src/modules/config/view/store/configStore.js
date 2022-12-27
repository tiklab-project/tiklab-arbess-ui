import {observable,action} from "mobx";

import {
    CreateTaskConfig,
    DeleteTaskConfig,
    UpdateTaskConfig,
    UpdateOrderTaskConfig,
    FindAllTaskConfig,
    ConfigValid,
    UpdateStageName,
} from "../api/config";

import {message} from "antd";

export class ConfigStore{

    @observable validType = []
    @observable data = []
    @observable isFindConfig = false
    @observable enabledValid = false // 是否启用表单效验
    @observable isPlugin = false // 是否存在插件
    @observable creacteValue = {}

    @action
    setCreacteValue = value =>{
        this.creacteValue = value
    }

    @action
    setData = value =>{
        this.data = value
    }

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
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
    setInitName = value =>{
        switch (value) {
            case 1:  return "通用Git"
            case 2:  return "Gitee"
            case 3:  return "Github"
            case 4:  return "Gitlab"
            case 5:  return "SVN"
            case 11: return "maven单元测试"
            case 21: return "maven"
            case 22: return "node"
            case 31: return "虚拟机"
            case 32: return "docker"
            case 41: return "sonarQuebe"
            case 51: return "nexus"
            case 52: return "SSH"
            case 61: return "消息通知"
            case 71: return "执行bat脚本"
            case 72: return "执行shell脚本"
            case 81: return "定时触发"
        }
    }

    @action
    createTaskConfig = async values =>{
        const params = {
            ...this.creacteValue,
            ...values
        }
        const data = await CreateTaskConfig(params)
        if(data.code===0){
            this.mess("添加成功")
            this.dataItem = {
                type: values.taskType,
                configId: data.data,
                name: this.setInitName(values.taskType)
            }
            this.enabledValid=!this.enabledValid
            this.isFindConfig=!this.isFindConfig
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
            this.enabledValid=!this.enabledValid
            this.isFindConfig=!this.isFindConfig
            this.taskFormDrawer = false
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
        const param = new FormData()
        param.append("pipelineId",values)
        return new Promise((resolve, reject) => {
            FindAllTaskConfig(param).then(res=>{
                if(res.code===0){
                    this.data = res.data===null?[]:res.data
                }
                else{
                    this.data = []
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    updateStageName = async value =>{
        const params = new FormData()
        params.append("stagesId",value.stagesId)
        params.append("stagesName",value.stagesName)
        const data = await UpdateStageName(params)
        if(data.code===0){
            this.mess("更新成功")
            this.isFindConfig = !this.isFindConfig
        }
        return data
    }

    @action
    configValid =async values =>{
        const params = new FormData()
        params.append("pipelineId",values)
        const data = await ConfigValid(params)
        if(data.code===0){
            this.validType = data.data && data.data
        }
        return data
    }
    
}

export const CONFIG_STORE = "configStore"
