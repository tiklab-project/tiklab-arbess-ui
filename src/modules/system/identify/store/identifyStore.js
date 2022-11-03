import {action,observable} from "mobx";
import {
    CreateAuth,
    UpdateAuth,
    DeleteAuth,
    FindAllAuth,
} from "../api/identify";

export class IdentifyStore {

    @observable fresh = false
    @observable visible = false
    @observable formValue = ""
    @observable identifyList = []

    @action
    setVisible = value =>{
        this.visible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuth = async value=>{
        const data = await CreateAuth(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    @action
    updateAuth = async value=>{
        const data = await UpdateAuth(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    deleteAuth = async value =>{
        const params = new FormData()
        params.append("authId",value.authId)
        params.append("type",value.type)
        const data = await DeleteAuth(params)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuth = async value =>{
        const params = new FormData()
        params.append("type",value)
        const data = await FindAllAuth(params)
        if(data.code===0 && data.data){
            this.identifyList = data.data
        }
        return data
    }

}

export const IDENTIFY_STORE = "identifyStore"