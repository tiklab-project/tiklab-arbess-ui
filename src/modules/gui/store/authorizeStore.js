import {action,observable} from "mobx";
import {
    FindCode,
    FindAccessToken,
    FindAllStorehouse,
    FindBranch,
    CallbackUrl,
} from "../api/authorize";

export class AuthorizeStore {


    @observable storehouseList = []
    @observable branchList = []
    @observable callUrlWarn = ""

    @action
    findCode = async value =>{
        return await FindCode(value)
    }

    @action
    findAccessToken = async value =>{
        return await FindAccessToken(value)
    }

    @action
    findAllStorehouse = async value =>{
        const params = new FormData()
        params.append("authId",value.authId)
        params.append("type",value.type)
        const data = await FindAllStorehouse(params)
        if(data.code===0 && data.data){
            this.storehouseList = data.data
        }
    }

    @action
    findBranch = async value =>{
        const params = new FormData()
        params.append("type",value.type)
        params.append("authId",value.authId)
        params.append("houseName",value.houseName)
        const data =  await FindBranch(params)
        if(data.code===0 && data.data){
            this.branchList = data.data
        }
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

const authorizeStore = new AuthorizeStore()
export default authorizeStore