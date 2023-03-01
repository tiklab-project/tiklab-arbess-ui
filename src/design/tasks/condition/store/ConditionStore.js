import {action,observable} from "mobx";
import {
    CreateCond,
    DeleteCond,
    UpdateCond,
    FindAllTaskCond
} from "../api/Condition";

export class CondStore{

    // 刷新
    @observable
    fresh = false

    // 条件数据
    @observable
    condData = []

    // 条件数据
    @observable
    fixCondData = []

    /**
     * 设置条件数据
     * @param value
     */
    @action
    setCondData = value =>{
        this.condData = value
    }

    /**
     * 添加条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createCond = async value =>{
        const data = await CreateCond(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 删除条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteCond = async value =>{
        const param = new FormData()
        param.append("condId",value)
        const data = await DeleteCond(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 更新条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateCond = async value =>{
        const data = await UpdateCond(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 获取天剑
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllTaskCond = async value =>{
        const param = new FormData()
        param.append("taskId",value)
        const data = await FindAllTaskCond(param)
        if(data.code===0){
            this.condData = data.data && data.data
            this.fixCondData = data.data && data.data
        }
        return data
    }

}

export const COND_STORE = "condStore"
