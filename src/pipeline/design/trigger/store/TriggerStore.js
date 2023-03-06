import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class TriggerStore {

    // 触发器
    @observable
    triggerData = []

    // 是否需要重新查找触发器
    @observable
    isFindTrigger = false

    /**
     * 更新触发器
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateTriggerConfig = async value =>{
        const data = await Axios.post("/pipelineTriggerConfig/updateConfig",value)
        if(data.code===0){
            message.info("更新成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        return data
    }

    /**
     * 删除触发器
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteTriggerConfig = async value =>{
        const param = new FormData()
        param.append("configId",value)
        const data = await Axios.post("/pipelineTriggerConfig/deleteConfig",param)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        return data
    }

    /**
     * 添加触发器
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createTriggerConfig = async value =>{
        const data = await Axios.post("/pipelineTriggerConfig/createConfig",value)
        if (data.code===0){
            message.info("添加成功",0.5)
            this.isFindTrigger = !this.isFindTrigger
        }
        if(data.code===50001){
            message.info(data.msg,0.5)
        }
        return data
    }

    /**
     * 获取所有触发器
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllTriggerConfig = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/pipelineTriggerConfig/findAllTriggerConfig",param)
        if (data.code===0){
            this.triggerData = data.data && data.data
        }
        return data
    }

    /**
     * 获取单个触发器信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    oneAllTriggerConfig = async value =>{
        const data = await Axios.post("/pipelineTriggerConfig/oneAllTriggerConfig",value)
        if (data.code===0){

        }
        return data
    }

}

export const TRIGGER_STORE = "triggerStore"
