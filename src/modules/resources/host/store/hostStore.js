import {action,observable} from "mobx";

import {
    CreateAuthHost,
    DeleteAuthHost,
    UpdateAuthHost,
    FindAllAuthHostList,
} from "../api/host";

import {message} from "antd";

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
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    @action
    findAllAuthHostList = async value =>{
        const param = new FormData()
        param.append("type",value)
        const data = await FindAllAuthHostList(param)
        if(data.code===0 && data.data){
            this.hostList = data.data
        }
        return data
    }

    @action
    deleteAuthHost =async value =>{
        const param = new FormData()
        param.append("hostId",value)
        const data = await DeleteAuthHost(param)
        if(data.code===0){
            this.fresh=!this.fresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    @action
    updateAuthHost =async value =>{
        const data = await UpdateAuthHost(value)
        if(data.code===0){
            this.fresh=!this.fresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }


}

export const HOST_STORE = "hostStore"