import {observable,action} from "mobx";

import {
    GetCode,
    GetAccessToken,
    GetProof,
    GetAllStorehouse,
    GetBranch,
} from "../api/github";


class GithubStore {

    constructor(store) {
        this.store = store
    }

    @action
    getCode = async () =>{
        const data = await GetCode()
        return data.data
    }

    @action
    getAccessToken = async value =>{
        const params = new FormData()
        params.append("code", value.code)
        const data = await GetAccessToken(params)
        return data.data
    }

    @action
    getGithubProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        const data = await GetProof(params)
        return data.data;

    }

    @action
    getAllGithubStorehouse = async value =>{
        const param = new FormData()
        param.append("proofId", value)
        const data =await GetAllStorehouse(param)
        return data.data

    }

    @action
    getGithubBranch = async value =>{
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        const data = await GetBranch(params)
        return data.data
    }

}

export default GithubStore