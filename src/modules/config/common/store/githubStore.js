import {action} from "mobx";

import {GetAccessToken, GetAllStorehouse, GetBranch, GetCode, GetProof,} from "../api/github";

export class GithubStore {

    @action
    getCode = async () =>{
        return await GetCode()
    }

    @action
    getAccessToken = async value =>{
        const params = new FormData()
        params.append("code", value)
        return await GetAccessToken(params)
    }

    @action
    getGithubProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        return await GetProof(params)
    }

    @action
    getAllGithubStorehouse = async value =>{
        const param = new FormData()
        param.append("proofId", value)
        return await GetAllStorehouse(param)
    }

    @action
    getGithubBranch = async value =>{
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        return await GetBranch(params)
    }

}

export const GITHUB_STORE = 'githubStore'