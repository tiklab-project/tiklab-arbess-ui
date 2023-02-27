import {action,observable} from "mobx";

import {
    CreateAuthServer,
    DeleteAuthServer,
    UpdateAuthServer,
    FindAllAuthServerList,
    CallbackUrl
} from "../api/Server";
import {message} from "antd";


export class ServerStore{

    @observable serverFresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable authServerList = []
    @observable callUrlWarn = ""

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
            this.serverFresh = !this.serverFresh
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    @action
    deleteAuthServer =async value =>{
        const param = new FormData()
        param.append("serverId",value)
        const data = await DeleteAuthServer(param)
        if(data.code===0){
            this.serverFresh=!this.serverFresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    @action
    updateAuthServer =async value =>{
        const data = await UpdateAuthServer(value)
        if(data.code===0){
            this.serverFresh=!this.serverFresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
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

    @action
    callbackUrl = async value=>{
        const param = new FormData()
        param.append("callbackUrl",value)
        const data = await CallbackUrl(param)
        if(data.code===0){
            this.callUrlWarn = data.data
        }
        return data
    }

}

export const SERVER_STORE = "serverStore"
