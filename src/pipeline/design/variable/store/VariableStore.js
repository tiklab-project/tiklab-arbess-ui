import {action,observable} from "mobx";

import {
    CreateVariable,
    DeleteVariable,
    UpdateVariable,
    FindAllVariable
} from "../api/Variable";

export class VariableStore{

    // 刷新
    @observable
    fresh = false

    // 变量数据
    @observable
    variableData = []

    // 变量数据（初始）
    @observable
    fixVariableData = []

    // 设置变量
    @action
    setVariableData = value =>{
        this.variableData = value
    }

    /**
     * 添加变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createVariable = async value =>{
        const data = await CreateVariable(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 删除变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteVariable = async value =>{
        const param = new FormData()
        param.append("varId",value)
        const data = await DeleteVariable(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 更新变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateVariable = async value =>{
        const data = await UpdateVariable(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 获取所有变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllVariable = async value =>{
        const param = new FormData()
        param.append("taskId",value)
        const data = await FindAllVariable(param)
        if(data.code===0){
            this.variableData = data.data && data.data
            this.fixVariableData = data.data && data.data
        }
        return data
    }

}

export const VARIABLE_STORE = "variableStore"
