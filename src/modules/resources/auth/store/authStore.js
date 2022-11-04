import {action,observable} from "mobx";

import {
    CreateAuth,
    DeleteAuth,
    UpdateAuth,
    FindAllAuth,
} from "../api/auth";

export class AuthStore {

    @observable fresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable authList = []

    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuth =async values =>{
        const data = await CreateAuth(values)
        if(data.code===0){
            this.fresh = !this.fresh
        }
    }

    @action
    deleteAuth =async value =>{
        const param = new FormData()
        param.append("authId",value)
        const data = await DeleteAuth(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    updateAuth =async value =>{
        const data = await UpdateAuth(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuth = async value=>{
        FindAllAuth().then(res=>{
            if(res.code===0 && res.data){
                this.authList = res.data
            }
        })
    }

}

export const AUTH_STORE = "authStore"