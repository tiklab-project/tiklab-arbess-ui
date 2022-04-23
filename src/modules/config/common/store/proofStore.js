import {observable, action} from "mobx";

import {
    CreateProof,
    FindAllGitProof,
    FindAllDeployProof,
} from "../api/proof";

class ProofStore{
    
    constructor(store) {
        this.store=store
    }

    @observable allGitProofList=[]
    @observable allDeployProofList=[]

    @action
    createProof =async values =>{
        const params = {
            proofScope:values.proofScope, //1或2
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofPort:values.proofPort,
            proofIp:values.proofIp,
        }
        const data = await CreateProof(params)
        return data.data
    }

    @action
    findAllGitProof = () =>{
        FindAllGitProof().then(res=>{
            this.allGitProofList=res.data.data
            console.log("allGitProofList", res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllDeployProof= () =>{
        FindAllDeployProof().then(res=>{
            this.allDeployProofList=res.data.data
            console.log("查看所有部署凭证信息",this.allDeployProofList)
        }).catch(error=>{
            console.log(error)
        })
    }
}

export default ProofStore