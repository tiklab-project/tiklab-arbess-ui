import {observable,action} from "mobx";

import {
    CreateTaskConfig,
    DeleteTaskConfig,
    UpdateTaskConfig,
    UpdateOrderTaskConfig,
    FindAllTaskConfig,
    ConfigValid,
    UpdateStageName,
} from "../api/Config";

import {message} from "antd";

export class ConfigStore{

    // 未完善必填配置的task
    @observable
    validType = []

    // task数据
    @observable
    data = []

    // 是否需要重新查找task
    @observable
    isFindConfig = false

    // 是否启用表单效验
    @observable
    enabledValid = false

    // 添加配置需要的值
    @observable
    createValue = {}

    // task详情抽屉状态
    @observable
    taskFormDrawer = false

    // task详情基本信息数据
    @observable
    dataItem = null

    /**
     * 添加配置需要的值
     * @param value
     */
    @action
    setCreateValue = value =>{
        this.createValue = value
    }

    /**
     * task数据
     * @param value
     */
    @action
    setData = value =>{
        this.data = value
    }

    /**
     * 是否需要重新查找task
     * @param value
     */
    @action
    setIsFindConfig = value =>{
        this.isFindConfig = value
    }

    /**
     * 抽屉状态
     * @param value
     */
    @action
    setTaskFormDrawer = value =>{
        this.taskFormDrawer = value
    }

    /**
     * 设置task详情基本信息数据
     * @param value
     */
    @action
    setDataItem = value =>{
        this.dataItem = value
    }

    /**
     * task的标题
     * @param value
     * @returns {string}
     */
    @action
    setInitName = value =>{
        switch (value) {
            case 1:  return "通用Git"
            case 2:  return "Gitee"
            case 3:  return "Github"
            case 4:  return "Gitlab"
            case 5:  return "SVN"
            case 11: return "maven单元测试"
            case 21: return "maven构建"
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

    /**
     * 重新查找task和查找必填配置是否完善
     */
    @action
    setReQuery = () =>{
        this.enabledValid=!this.enabledValid
        this.isFindConfig=!this.isFindConfig
    }

    /**
     * 添加配置
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createTaskConfig = async values =>{
        const params = {
            ...this.createValue,
            ...values
        }
        const data = await CreateTaskConfig(params)
        if(data.code===0){
            message.info("添加成功",0.5)
            this.dataItem = {
                type: values.taskType,
                taskId: data.data,
                taskName: this.setInitName(values.taskType)
            }
            this.setReQuery()
            this.taskFormDrawer = true
        }
        if(data.code===50001){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 删除配置
     * @param values
     * @returns {Promise<*>}
     */
    @action
    deleteTaskConfig = async values =>{
        const data = await DeleteTaskConfig(values)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.setReQuery()
            this.taskFormDrawer = false
        }
        return data
    }

    /**
     * 更新配置
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    updateTaskConfig = values =>{
        return new Promise((resolve, reject) => {
            UpdateTaskConfig(values).then(res=>{
                if(res.code===0){
                    this.setReQuery()
                    this.dataItem[Object.keys(values.values)[0]] = Object.values(values.values)[0]
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }


    /**
     * 更改顺序配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateOrderTaskConfig = async value =>{
        const data = await UpdateOrderTaskConfig(value)
        if(data.code===0){
            this.isFindConfig=!this.isFindConfig
        }
        return data
    }

    /**
     * 查找所有配置
     * @param values
     * @returns {Promise<unknown>}
     */
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

    /**
     * 更改阶段名称
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateStageName = async value =>{
        const params = new FormData()
        params.append("stageId",value.stageId)
        params.append("stagesName",value.stagesName)
        const data = await UpdateStageName(params)
        if(data.code===0){
            this.isFindConfig = !this.isFindConfig
        }
        return data
    }

    /**
     * 必填配置是否完善
     * @param values
     * @returns {Promise<*>}
     */
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
