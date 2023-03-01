import {action,observable} from "mobx";
import {
    FindCode,
    FindAccessToken,
    FindAllStorehouse,
    FindBranch,
} from "../api/Authorize";

import {message} from "antd";

export class AuthorizeStore {

    // 仓库
    @observable
    storehouseList = []

    // 分支
    @observable
    branchList = []

    // 是否在授权中
    @observable
    skin = false

    /**
     * 授权,获取code
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCode = async value =>{
        return await FindCode(value)
    }

    /**
     * 获取token
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAccessToken = async value =>{
        this.skin = true
        const data = await FindAccessToken(value)
        if(data.code===0){
            this.skin = false
            message.success("授权成功",0.5)
        }
        else {
            this.skin = false
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllStorehouse = async value =>{
        const params = new FormData()
        params.append("authId",value.authId)
        params.append("type",value.type)
        const data = await FindAllStorehouse(params)
        if(data.code===0){
            this.storehouseList = data.data
        }else {
            this.storehouseList = []
        }
    }

    /**
     * 获取分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findBranch = async value =>{
        const params = new FormData()
        params.append("type",value.type)
        params.append("authId",value.authId)
        params.append("houseName",value.houseName)
        const data =  await FindBranch(params)
        if(data.code===0){
            this.branchList = data.data
        }
        else {
            message.info(data.msg,0.5)
            this.branchList = []
        }
    }

}

export const AUTHORIZE_STORE = "authorizeStore"
