import {action,observable} from "mobx";
import {
    FindCode,
    FindAccessToken,
    FindAllStorehouse,
    FindBranch,
    FindState,
    UpdateProof,
} from "../api/authorize";

export class AuthorizeStore {


    @observable storehouseList = []
    @observable branchList = []

    @action
    findCode = async value =>{
        const params = new FormData()
        params.append("type",value)
        return await FindCode(params)
    }

    @action
    findAccessToken = async value =>{
        const params = new FormData()
        params.append("code",value.code)
        params.append("type",value.type)
        return await FindAccessToken(params)
    }

    @action
    findAllStorehouse = async value =>{
        const params = new FormData()
        params.append("proofId",value.proofId)
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
        params.append("proofId",value.proofId)
        params.append("houseName",value.houseName)
        const data =  await FindBranch(params)
        if(data.code===0 && data.data){
            this.branchList = data.data
        }
    }

    @action
    findState = async ()=>{
        return await FindState()
    }

    @action
    updateProof = async value=>{
        const param = new FormData()
        param.append("name",value.name)
        param.append("proofId",value.proofId)
        return await UpdateProof(param)
    }
}

export const AUTHORIZE_STORE = "authorizeStore"