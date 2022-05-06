import {observable,action} from "mobx";
import qs from "qs";

import {
    Url,
    Code,
    GetAllStorehouse,
    GetBranch,
    GetProof,
} from "../api/gitAuthorize";

class GitAuthorizeStore{
    
    constructor(store) {
        this.store=store
    }

    @observable gitList = []
    @observable branchList = []
    @observable gitProofId = ''
    @observable userMessage = ''

    @action
    url =async () =>{
        const data = await Url();
        return data.data;
    }

    @action
    code =async value =>{
        const param = qs.stringify({code: value})
        const data = await Code(param);
        return data.data;
    }

    @action
    getGiteeProof =async value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("accessToken", value.accessToken)
        const data = await GetProof(params)
        return data.data;

    }

    @action
    getAllStorehouse = value =>{
        const param = new FormData()
        param.append("accessToken", value.accessToken)
        GetAllStorehouse(param).then(res=>{
            this.gitList =res.data.data
            console.log('getAllStorehouse',  this.gitList )
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getBranch = value =>{
        // const param = qs.stringify({projectName: value})
        const params = new FormData()
        params.append('projectName',value.projectName)
        params.append('proofId',value.proofId)
        GetBranch(params).then(res=>{
            this.branchList =res.data.data
            console.log('branchList',  this.branchList )
        }).catch(error=>{
            console.log(error)
        })
    }


}

export default GitAuthorizeStore