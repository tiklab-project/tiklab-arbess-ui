import {observable, action} from "mobx";

import {
    CreateProof,
    FindAllProof,
    FindOneProof,
} from "../api/proof";

class ProofStore{
    
    constructor(store) {
        this.store=store
    }

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
    findAllProof = async  value =>{
        const param = new FormData()
        param.append('type',value.type)
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

export default ProofStore