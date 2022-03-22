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
    getAllStorehouse = value =>{
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
    getProof = value =>{
        const param = qs.stringify({configureId: value})
        GetProof(param).then(res=>{
            this.gitProofId=res.data.data
            localStorage.setItem('gitProofId',this.gitProofId)
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default GitAuthorizeStore