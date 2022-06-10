import {observable,action} from "mobx";

import {
    Url,
    Code,
    GetAllStorehouse,
    GetBranch,
    GetProof,
} from "../api/gitee";

export class GiteeStore {

    //gitee授权--地址
    @action
    url =async () =>{
        const data = await Url();
        return data.data;
    }

    //gitee授权--Code
    @action
    code =async value =>{
        const params = new FormData()
        params.append("code", value)
        const data = await Code(params);
        return data;
    }

    //gitee--创建凭证
    @action
    getGiteeProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        const data = await GetProof(params)
        return data;

    }

    //gitee--获取所有仓库
    @action
    getAllGiteeStorehouse =async value =>{
        const param = new FormData()
        param.append("proofId", value)
        const data =await GetAllStorehouse(param)
        return data
    }

    //gitee--分支
    @action
    getGiteeBranch =async value =>{
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        const data = await GetBranch(params)
        return data
    }

}

export const GITEE_STORE = 'giteeStore'