import {action, observable} from "mobx";
import {
    CreateThirdAddress,
    DeleteThirdAddress,
    FindAllThirdAddress,
    UpdateThirdAddress
} from "../api/thirdAddress";

export class ThirdAddressStore {

    @observable authList = []

    @action
    createAuthorize = async value =>{
        return await CreateThirdAddress(value)
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
        return await UpdateThirdAddress(params)
    }

    @action
    deleteAuthorize = async value =>{
        const params = new FormData()
        params.append("authorizeId",value)
        return await DeleteThirdAddress(params)
    }

    @action
    findAllAuthorize = async value =>{
        return await FindAllThirdAddress(value)
    }

}

export const THIRDADDRESS_STORE = "thirdAddressStore"
