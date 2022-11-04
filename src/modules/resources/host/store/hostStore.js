import {action,observable} from "mobx";

import {
    CreateAuthHost,
    DeleteAuthHost,
    UpdateAuthHost,
    FindAllAuthHost,
} from "../api/host";

export class HostStore {

    @observable fresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable hostList = []

    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuthHost = async value =>{
        const data = await CreateAuthHost(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuthHost = async () =>{
        const data = await FindAllAuthHost()
        if(data.code===0 && data.data){
            this.hostList = data.data
        }
    }

    @action
    deleteAuthHost =async value =>{
        const param = new FormData()
        param.append("hostId",value)
        const data = await DeleteAuthHost(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    updateAuthHost =async value =>{
        const data = await UpdateAuthHost(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }


}

export const HOST_STORE = "hostStore"