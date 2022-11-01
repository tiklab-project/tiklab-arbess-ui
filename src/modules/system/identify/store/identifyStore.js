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

    @action
    setVisible = value =>{
        this.visible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuth = async values=>{
        const data = await CreateAuth(values)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    @action
    updateAuth = async value=>{
        const params = {
            authId:value.authId,
            name:value.name,
            type:value.type,
            authType:value.authType,
            username:value.username,
            password:value.password,
            url:value.url,
            token:value.token,
        }
        const data = await UpdateAuth(params)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    deleteAuth = async value =>{
        const params = new FormData()
        params.append("authId",value)
        const data = await DeleteAuth(params)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuth = async value =>{
        return await FindAllAuth()
    }

}

export const IDENTIFY_STORE = "identifyStore"