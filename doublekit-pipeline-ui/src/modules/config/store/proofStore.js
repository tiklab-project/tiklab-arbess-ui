import {observable, action, values} from "mobx";
import qs from "qs";

import {
    CreateProof,
    FindAllGitProof,
    FindAllDeployProof,
    FindOneProof
} from "../api/proof";

class ProofStore{
    constructor(store) {
        this.store=store
    }

    @observable oneGitProof=''
    @observable oneDeployProof=''

    @observable allGitProofList=[]
    @observable allDeployProofList=[]

    @action
    createProof = values =>{
        const param = {
            proofScope:values.proofScope, //1或2
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofPort:values.proofPort,
        }
        CreateProof(param).then(res=>{
            console.log("创建git凭证",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findOneGitProof =async  values =>{
        const params = qs.stringify({proofId: values})
        await FindOneProof(params).then(res=>{
            this.oneGitProof=res.data.data
            console.log("获取Git某一凭证信息",this.oneGitProof)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findOneDeployProof = async values =>{
        const params = qs.stringify({proofId: values})
        await FindOneProof(params).then(res=>{
            this.oneDeployProof=res.data.data
            console.log("获取部署某一凭证信息",this.oneDeployProof)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllGitProof = () =>{
        FindAllGitProof().then(res=>{
            this.allGitProofList=res.data.data
            console.log("查看git凭证信息", this.allGitProofList)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllDeployProof= () =>{
        FindAllDeployProof().then(res=>{
            console.log("查看所有部署凭证信息",this.allDeployProofList)
            this.allDeployProofList=res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }
}

export default ProofStore