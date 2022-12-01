import {action,observable} from "mobx";
import {
    FindCode,
    FindAccessToken,
    FindAllStorehouse,
    FindBranch,
} from "../api/authorize";

import {message} from "antd";

export class AuthorizeStore {


    @observable storehouseList = []
    @observable branchList = []
    @observable skin = false

    @action
    findCode = async value =>{
        return await FindCode(value)
    }

    @action
    findAccessToken = async value =>{
        this.skin = true
        const data = await FindAccessToken(value)
        if(data.code===0){
            this.skin = false
            message.success("授权成功")
        }
        else {
            // this.skin = false
            message.info(data.msg)
        }
        return data
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
        else {
            message.info(data.msg)
        }
    }

}

export const AUTHORIZE_STORE = "authorizeStore"