import {action} from "mobx";

import {
    Code,
    GetAllStorehouse,
    GetBranch,
    GetProof,
    Url,
} from "../api/gitee";

export class GiteeStore {

    //gitee授权--地址
    @action
    url =async () =>{
        return await Url()
    }

    //gitee授权--Code
    @action
    code =async value =>{
        const params = new FormData()
        params.append("code", value)
        return await Code(params);
    }

    //gitee--创建凭证
    @action
    getGiteeProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        return await GetProof(params);

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
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        return await GetBranch(params)
    }

}

export const GITEE_STORE = 'giteeStore'