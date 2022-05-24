import {observable,action} from "mobx";

import {
    Url,
    Code,
    GetAllStorehouse,
    GetBranch,
    GetProof,
} from "../api/gitee";

class GiteeStore {
    
    constructor(store) {
        this.store=store
    }

    @observable giteeList = []
    @observable giteeBranchList = []

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
        params.append("code", value.code)
        const data = await Code(params);
        return data.data;
    }

    //gitee--创建凭证
    @action
    getGiteeProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        const data = await GetProof(params)
        return data.data;

    }

    //gitee--获取所有仓库
    @action
    getAllGiteeStorehouse = value =>{
        const param = new FormData()
        param.append("accessToken", value.accessToken)
        GetAllStorehouse(param).then(res=>{
            this.giteeList =res.data.data
            console.log('getAllStorehouse',  this.giteeList )
        }).catch(error=>{
            console.log(error)
        })
    }

    //gitee--分支
    @action
    getGiteeBranch = value =>{
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        GetBranch(params).then(res=>{
            this.giteeBranchList =res.data.data
            console.log('giteeBranchList',  res )
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default GiteeStore