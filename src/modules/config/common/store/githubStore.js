import {observable,action} from "mobx";

import {
    GetCode,
    GetAccessToken,
    GetProof,
    GetAllStorehouse,
    GetBranch,
} from "../api/github";


export class GithubStore {

    @action
    getCode = async () =>{
        const data = await GetCode()
        return data.data
    }

    @action
    getAccessToken = async value =>{
        const params = new FormData()
        params.append("code", value)
        const data = await GetAccessToken(params)
        return data
    }

    @action
    getGithubProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        const data = await GetProof(params)
        return data
    }

    @action
    getAllGithubStorehouse = async value =>{
        const param = new FormData()
        param.append("proofId", value)
        const data =await GetAllStorehouse(param)
        return data
    }

    @action
    getGithubBranch = async value =>{
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        const data = await GetBranch(params)
        return data
    }

}

export const GITHUB_STORE = 'githubStore'