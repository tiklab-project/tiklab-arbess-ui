import {action,observable} from "mobx";
import {
    CreateCond,
    DeleteCond,
    UpdateCond,
    FindAllTaskCond
} from "../api/condition";

export class CondStore{

    @observable fresh = false
    @observable condData = []
    @observable fixCondData = []

    @action
    setCondData = value =>{
        this.condData = value
    }

    @action
    createCond = async value =>{
        const data = await CreateCond(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

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

    @action
    updateCond = async value =>{
        const data = await UpdateCond(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

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
