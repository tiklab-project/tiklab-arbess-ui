import {action, observable} from "mobx";
import {
    CreateAuthorize,
    DeleteAuthorize,
    FindAllAuthorize,
    UpdateAuthorize
} from "../api/auth";

export class AuthStore{

    @observable authList = []

    @action
    createAuthorize = async value =>{
        return await CreateAuthorize(value)
    }

    @action
    updateAuthorize = async value =>{
        const params = {
            id:value.id,
            type:value.type,
            clientId:value.clientId,
            clientSecret:value.clientSecret,
            callbackUrl:value.callbackUrl,

        }
        return await UpdateAuthorize(params)
    }

    @action
    deleteAuthorize = async value =>{
        const params = new FormData()
        params.append("authorizeId",value)
        return await DeleteAuthorize(params)
    }

    @action
    findAllAuthorize = async value =>{
        return await FindAllAuthorize(value)
    }

}

export const AUTH_STORE = "authStore"
