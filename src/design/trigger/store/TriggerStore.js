import {observable,action} from "mobx";

import {
    UpdateTriggerConfig,
    DeleteTriggerConfig,
    CreateTriggerConfig,
    FindAllTriggerConfig,
    OneAllTriggerConfig
} from "../api/Trigger";

import {message} from "antd";

export class TriggerStore {

    @observable triggerData = []
    @observable isFindTrigger = false

    @action
    updateTriggerConfig = async value =>{
        const data = await UpdateTriggerConfig(value)
        if(data.code===0){
            message.info("更新成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        return data
    }

    @action
    deleteTriggerConfig = async value =>{
        const param = new FormData()
        param.append("configId",value)
        const data = await DeleteTriggerConfig(param)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        return data
    }

    @action
    createTriggerConfig = async value =>{
        const data = await CreateTriggerConfig(value)
        if (data.code===0){
            message.info("添加成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        if(data.code===50001){
            message.info(data.msg,0.5)
        }
        return data
    }

    @action
    findAllTriggerConfig = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await FindAllTriggerConfig(param)
        if (data.code===0){
            this.triggerData = data.data && data.data
        }
        return data
    }

    @action
    oneAllTriggerConfig = async value =>{
        const data = await OneAllTriggerConfig(value)
        if (data.code===0){

        }
        return data
    }

}

export const TRIGGER_STORE = "triggerStore"
