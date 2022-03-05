import {observable, action} from "mobx";
import qs from "qs";

import {
    CreateProof,
    SelectAllProof,
    SelectProofName
} from "../api/proof";

class ProofStore{
    constructor(store) {
        this.store=store
    }

    @observable allProof=[]
    @observable proofId=''
    @observable proofName=''

    @action
    createProof = values =>{
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
            this.proofId=res.data.data
            localStorage.setItem('proofId',this.proofId)
            console.log("创建凭证",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    selectAllProof = values =>{
        SelectAllProof().then(res=>{
            console.log("添加后查看凭证",res)
            this.allProof=res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    selectProofName = values =>{
        const params = qs.stringify({proofId: values})
        SelectProofName(params).then(res=>{
            console.log("查找源码凭证名称",res)
            this.proofName=res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default ProofStore