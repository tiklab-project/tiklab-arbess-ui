import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class StageStore {

    // 多阶段列表
    @observable
    stageList = []

    // 重新渲染
    @observable
    stageFresh = false

    // 多阶段未填的必需任务
    @observable
    stageMustField = []

    /**
     * 添加多阶段
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createStage = async value =>{
        const data = await Axios.post("/stage/createStage",value)
        if(data.code===0){
            message.info("添加成功",0.7)
            this.stageFresh=!this.stageFresh
        }
        return data
    }

    /**
     * 获取多阶段
     * @param value
     * @returns {Promise<*>}
     */
    @action
    finAllStage = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/stage/finAllStage",param)
        if(data.code===0){
            this.stageList = data.data || []
        }
        return data
    }

    /**
     * 更新多阶段名称
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateStageName = async value =>{
        const data = await Axios.post("/stage/updateStageName",value)
        if(data.code===0){
            this.stageFresh=!this.stageFresh
        }
        return data
    }

    /**
     * 删除多阶段
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteStage = async value =>{
        const param = new FormData()
        param.append("taskId",value)
        const data = await Axios.post("/stage/deleteStage",param)
        if(data.code===0){
            message.info("删除成功",0.7)
            this.stageFresh=!this.stageFresh
        }
        return data
    }


    /**
     * 获取多阶段未填的必需任务
     * @param value
     * @returns {Promise<*>}
     */
    @action
    validStagesMustField = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/stage/validStagesMustField",param)
        if(data.code===0){
            this.stageMustField = data.data || []
        }
        return data
    }

}

const stageStore = new StageStore();
export default stageStore
