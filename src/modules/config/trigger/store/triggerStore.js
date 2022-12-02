import {observable,action} from "mobx";

import {
    UpdateBeforeConfig,
    DeleteBeforeConfig,
    CreateBeforeConfig,
    FindAllBeforeConfig,
    OneAllBeforeConfig
} from "../api/trigger";

import {message} from "antd";

export class TriggerStore {

    @observable triggerData = []
    @observable isFindTrigger = false

    @action
    updateBeforeConfig = async value =>{
        const data = await UpdateBeforeConfig(value)
        if(data.code===0){
            message.info("添加成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        return data
    }

    @action
    deleteBeforeConfig = async value =>{
        const data = await DeleteBeforeConfig(value)
        if(data.code===0){
            message.info("删除成功",0.5)
        }
        return data
    }

    @action
    createBeforeConfig = async value =>{
        const data = await CreateBeforeConfig(value)
        if (data.code===0){
            message.info("添加成功",0.5)
        }
        return data
    }

    @action
    findAllBeforeConfig = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await FindAllBeforeConfig(param)
        if (data.code===0){
            this.triggerData = data.data && data.data
        }
        return data
    }

    @action
    oneAllBeforeConfig = async value =>{
        const data = await OneAllBeforeConfig(value)
        if (data.code===0){

        }
        return data
    }

}

export const TRIGGER_STORE = "triggerStore"
