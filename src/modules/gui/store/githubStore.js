import {action} from "mobx";

import {
    GetAccessToken,
    GetAllStorehouse,
    GetBranch,
    GetCode,
    GetProof
} from "../api/github";

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
    getGithubProof =async values =>{
        const params = {
            proofName:values.proofName,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            user:{id:values.user.id},
            type:values.type,
            proofScope:values.proofScope,
            proofType:values.proofType ,
        }
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
        params.append("projectName",value.projectName)
        params.append("proofId",value.proofId)
        return await GetBranch(params)
    }

}

const githubStore = new GithubStore()
export default githubStore;