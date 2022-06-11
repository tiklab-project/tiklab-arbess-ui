import {action} from "mobx";

import {CreateProof, FindAllProof, FindOneProof, GetState,} from "../api/proof";

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
        return await FindAllProof(param)
    }

    @action
    findOneProof =async values=>{
        const param = new FormData()
        param.append('proofId',values.proofId)
        return await FindOneProof(param)
    }

    @action
    getState = async value=>{
        const params = new FormData()
        params.append('code',value.code)
        params.append('state',value.state)
        return await GetState(params)
    }

}

export const PROOF_STORE = 'proofStore'