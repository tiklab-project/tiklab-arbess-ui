import {observable,action} from "mobx";
import {
    CreateStage,
    FinAllStage,
    UpdateStage,
    UpdateStageName,
    DeleteStage
} from "../api/Stage";

import {message} from "antd";

export class StageStore {

    // 多阶段列表
    @observable
    stageList = []

    // 重新渲染
    @observable
    stageFresh = false

    /**
     * 添加多阶段
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createStage = async value =>{
        const data = await CreateStage(value)
        if(data.code===0){
            message.info("添加成功")
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
        const data = await FinAllStage(param)
        if(data.code===0){
            this.stageList = data.data && data.data
        }
        return data
    }

    /**
     * 更新多阶段
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateStage = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await UpdateStage(param)
        if(data.code===0){
            this.stageFresh=!this.stageFresh
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
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await UpdateStageName(param)
        if(data.code===0){
            this.stageList = data.data && data.data
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
        const data = await DeleteStage(param)
        if(data.code===0){
            message.info("删除成功")
            this.stageFresh=!this.stageFresh
        }
        return data
    }

}

export const STAGE_STORE = "stageStore"
