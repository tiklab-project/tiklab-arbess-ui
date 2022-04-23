import {observable,action} from "mobx";
import qs from "qs";

import {
    Url,
    Code,
    GetAllStorehouse,
    GetBranch,
    GetUserMessage,
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
    getAllStorehouse = () =>{
        GetAllStorehouse().then(res=>{
            this.gitList =res.data.data
            console.log('getAllStorehouse',  this.gitList )
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getBranch = value =>{
        const param = qs.stringify({projectName: value})
        GetBranch(param).then(res=>{
            this.branchList =res.data.data
            console.log('branchList',  this.branchList )
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getUserMessage =async () =>{
        const data = await GetUserMessage()
        return data.data;
    }

    @action
    getGiteeProof = value =>{
        const params = new FormData()
        params.append("proofName", value.proofName)
        params.append("configureId", value.configureId)
        GetProof(params).then(res=>{
            console.log('getGiteeProof',res  )
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default GitAuthorizeStore