import {action,observable} from "mobx";

import {
    CreateAuth,
    DeleteAuth,
    UpdateAuth,
    FindAllAuth,
} from "../api/Auth";

import {message} from "antd";

export class AuthStore {

    @observable authFresh = false
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
            this.authFresh = !this.authFresh
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    @action
    deleteAuth =async value =>{
        const param = new FormData()
        param.append("authId",value)
        const data = await DeleteAuth(param)
        if(data.code===0){
            this.authFresh=!this.authFresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    @action
    updateAuth =async value =>{
        const data = await UpdateAuth(value)
        if(data.code===0){
            this.authFresh=!this.authFresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }

    @action
    findAllAuth = async value=>{
        const data = await FindAllAuth()
        if(data.code===0 && data.data){
            this.authList = data.data
        }
        return data
    }

}

export const AUTH_STORE = "authStore"
