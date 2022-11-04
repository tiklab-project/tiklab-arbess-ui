import {action,observable} from "mobx";

import {
    CreateAuthCode,
    DeleteAuthCode,
    UpdateAuthCode,
    FindAllAuthCodeList,
} from "../api/code";

export class CodeStore{

    @observable fresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable authCodeList = []

    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuthCode = async value =>{
        const data = await CreateAuthCode(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuthCodeList = async value =>{
        const param = new FormData()
        param.append("type",value)
        const data = await FindAllAuthCodeList(param)
        if(data.code===0 && data.data){
            this.authCodeList = data.data
        }
    }

    @action
    deleteAuthCode =async value =>{
        const param = new FormData()
        param.append("codeId",value)
        const data = await DeleteAuthCode(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    updateAuthCode =async value =>{
        const data = await UpdateAuthCode(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }


}

export const CODE_STORE = "codeStore"