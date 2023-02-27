import {action,observable} from "mobx";

import {
    CreateVariable,
    DeleteVariable,
    UpdateVariable,
    FindAllVariable
} from "../api/Variable";

export class VariableStore{

    @observable fresh = false
    @observable variableData = []
    @observable fixVariableData = []

    @action
    setVariableData = value =>{
        this.variableData = value
    }

    @action
    createVariable = async value =>{
        const data = await CreateVariable(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

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

    @action
    updateVariable = async value =>{
        const data = await UpdateVariable(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

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
