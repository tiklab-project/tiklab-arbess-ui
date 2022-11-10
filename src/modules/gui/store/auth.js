import {action} from "mobx";
import {
    CreateAuth,
    FindAllAuth,
    CreateAuthHost,
    FindAllAuthHostList,
    CreateAuthServer,
    FindAllAuthServerList,
} from "../api/auth";

export class AuthStore {

    

    @action
    createAuth =async values =>{
        return await CreateAuth(values)
    }

    @action
    findAllAuth = async value=>{
        return await FindAllAuth()
    }

    @action
    createAuthHost = async value =>{
        return await CreateAuthHost(value)
    }

    @action
    findAllAuthHostList = async value=>{
        const param = new FormData()
        param.append("type",value)
        return await FindAllAuthHostList(param)
    }

    @action
    createAuthServer =async values =>{
        return await CreateAuthServer(values)
    }

    @action
    findAllAuthServerList = async value=>{
        const param = new FormData()
        param.append("type",value)
        return await FindAllAuthServerList(param)
    }
    
}


const authStore = new AuthStore()
export default authStore