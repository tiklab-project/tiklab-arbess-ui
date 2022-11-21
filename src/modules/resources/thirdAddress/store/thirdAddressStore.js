import {action, observable} from "mobx";
import {
    CreateThirdAddress,
    DeleteThirdAddress,
    FindAllThirdAddress,
    UpdateThirdAddress
} from "../api/thirdAddress";

export class ThirdAddressStore {

    @observable thirdList = []

    @action
    createAuthorize = async value =>{
        const data = await CreateThirdAddress(value)
        if(data.code===0){
            this.findAllAuthorize()
        }
        return data
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
        const data = await UpdateThirdAddress(params)
        if(data.code===0){
            this.findAllAuthorize()
        }
        return data
    }

    @action
    deleteAuthorize = async value =>{
        const params = new FormData()
        params.append("authorizeId",value)
        const data =  await DeleteThirdAddress(params)
        if(data.code===0){
            this.findAllAuthorize()
        }
        return data
    }

    @action
    findAllAuthorize = async value =>{
        const data = await FindAllThirdAddress()
        if(data.code===0 && data.data){
            this.thirdList = data.data
        }
        return data
    }

}

export const THIRDADDRESS_STORE = "thirdAddressStore"
