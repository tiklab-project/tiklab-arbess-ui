import {action,observable} from "mobx";

import {
    CreateAuthServer,
    DeleteAuthServer,
    UpdateAuthServer,
    FindAllAuthServerList,
} from "../api/server";

export class ServerStore{

    @observable fresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable authServerList = []

    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuthServer =async values =>{
        const data = await CreateAuthServer(values)
        if(data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    @action
    deleteAuthServer =async value =>{
        const param = new FormData()
        param.append("serverId",value)
        const data = await DeleteAuthServer(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    @action
    updateAuthServer =async value =>{
        const data = await UpdateAuthServer(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    @action
    findAllAuthServerList = async value=>{
        const param = new FormData()
        param.append("type",value)
        const data = await FindAllAuthServerList(param)
        if(data.code===0 && data.data){
            this.authServerList = data.data
        }
        return data
    }

}

export const SERVER_STORE = "serverStore"