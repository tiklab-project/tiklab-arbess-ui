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

    @observable allGitProof=[]
    @observable gitProofId=''
    @observable oneCodeProof=''

    @observable allDeployProof=[]
    @observable deployProofId=''
    @observable oneDeployProof=''

    @action
    createGitProof = values =>{
        let param = {
            proofScope:values.proofScope, //1或2
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofPort:values.proofPort,
        }
        CreateProof(param).then(res=>{
            this.gitProofId=res.data.data
            console.log("创建git凭证",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllGitProof = () =>{
        FindAllGitProof().then(res=>{
            this.allGitProof=res.data.data
            console.log("查看git凭证信息", this.allGitProof)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findOneCodeProof = values =>{
        const params = qs.stringify({proofId: values})
        FindOneProof(params).then(res=>{
            this.oneCodeProof=res.data.data
            console.log("获取某一git凭证",this.oneCodeProof)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    createDeployProof = values =>{
        let param = {
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofPort:values.proofPort,
        }
        CreateProof(param).then(res=>{
            this.deployProofId=res.data.data
            console.log("创建部署凭证",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllDeployProof= () =>{
        FindAllDeployProof().then(res=>{
            console.log("查看所有部署凭证信息",res)
            this.allDeployProof=res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findOneDeployProof = values =>{
        const params = qs.stringify({proofId: values})
        FindOneProof(params).then(res=>{
            this.oneDeployProof=res.data.data
            console.log("获取某一部署凭证",res)
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default ProofStore