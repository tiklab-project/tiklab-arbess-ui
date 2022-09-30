import {action} from "mobx";

import {
    Code,
    GetAllStorehouse,
    GetBranch,
    GetProof,
    Url,
    GetState,
} from "../api/gitee";

export class GiteeStore {

    //gitee授权--地址
    @action
    url =async value =>{
        const param = new FormData()
        param.append("callbackUri",value)
        return await Url(param)
    }

    //gitee授权--Code
    @action
    code =async value =>{
        const params = new FormData()
        params.append("code", value)
        return await Code(params)
    }

    //gitee--创建凭证
    @action
    getGiteeProof =async values =>{
        const params = {
            proofName:values.proofName,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            user:{id:values.user.id},
            type:values.type,
            proofScope:values.proofScope,
            proofType:values.proofType,
        }
        return await GetProof(params)
    }

    //gitee--获取所有仓库
    @action
    getAllGiteeStorehouse =async value =>{
        const param = new FormData()
        param.append("proofId", value)
        return await GetAllStorehouse(param)
    }

    //gitee--分支
    @action
    getGiteeBranch =async value =>{
        const params = new FormData()
        params.append("projectName",value.projectName)
        params.append("proofId",value.proofId)
        return await GetBranch(params)
    }

    @action
    getState = async value=>{
        const params = new FormData()
        params.append("code",value.code)
        params.append("state",value.state)
        return await GetState(params)
    }

}

export const GITEE_STORE = "giteeStore"