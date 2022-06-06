import {observable, action} from "mobx";

import {
    CreateProof,
    FindAllProof,
    FindOneProof,
} from "../api/proof";

export class ProofStore{

    @action
    createProof =async values =>{
        const params = {
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofPort:values.proofPort,
            proofIp:values.proofIp,
        }
        CreateProof(params).then(res=>{
            console.log('创建部署凭证',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllProof = async  value =>{
        const param = new FormData()
        param.append('type',value)
        const data = await FindAllProof(param)
        return data.data
    }

    @action
    findOneProof =async values=>{
        const param = new FormData()
        param.append('proofId',values.proofId)
        const data = await FindOneProof(param)
        return data.data
    }

}

export const PROOF_STORE = 'proofStore'