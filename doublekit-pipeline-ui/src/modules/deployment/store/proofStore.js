import {observable, action} from "mobx";

import {
    CreateProof,
    SelectAllProof,
    SelectProofName
} from "../api/proof";
import qs from "qs";


class ProofStore{
    constructor(store) {
        this.store=store
    }

    @observable allProof=[]
    @observable proofName=''

    @action
    createProof = values =>{
        let param = {
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe
        }
        CreateProof(param).then(res=>{
            localStorage.setItem('proofId',res.data.data)
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
        return new Promise((resolve, reject)=>{
            SelectProofName(params).then(res=>{
                console.log("查找流水名称",res)
                this.proofName=res.data.data
                resolve(res.data)
                // localStorage.setItem('proofName',this.proofName)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }
}
export default ProofStore