import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class TriggerStore {

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
    updateTrigger = async value =>{
        const data = await Axios.post("/trigger/updateTrigger",value)
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
    deleteTrigger = async value =>{
        const param = new FormData()
        param.append("triggerId",value)
        const data = await Axios.post("/trigger/deleteTrigger",param)
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
    createTrigger = async value =>{
        const data = await Axios.post("/trigger/createTrigger",value)
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
    findAllTrigger = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/trigger/findAllTrigger",param)
        if (data.code===0){
            this.triggerData = data.data && data.data
        }
        return data
    }

}

const triggerStore = new TriggerStore();
export default triggerStore
