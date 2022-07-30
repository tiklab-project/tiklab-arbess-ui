import {action,observable} from "mobx";

import {
    CreateProof,
    FindOneProof,
    FindMatFlowProof,
    UpdateProof,
    DeleteProof,
} from "../api/proof";

export class ProofStore{

    @observable proofList = []
    @observable fresh = false

    @action
    setFresh = value =>{
        this.fresh = value
    }

    @action
    createProof =async values =>{
        const params = {
            user:{id:values.user.id},
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            type:values.type,
            proofCreateTime:values.proofCreateTime,
            proofList:values.proofList
        }
        return await CreateProof(params)
    }

    @action
    findOneProof =async values=>{
        const param = new FormData()
        param.append("proofId",values.proofId)
        return await FindOneProof(param)
    }

    @action
    findMatFlowProof =async values =>{
        const params = new FormData()
        params.append("matFlowId",values.matFlowId)
        params.append("userId",values.userId)
        params.append("type",values.type)
        FindMatFlowProof(params).then(res=>{
            console.log(res)
            if(res.code===0 && res.data){
                this.proofList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateProof =async values =>{
        const params = {
            matFlow:{matflowId: values.matFlow.matflowId},
            proofId:values.proofId,
            proofType:values.proofType,
            proofScope:values.proofScope,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            type:values.type,
            proofList:values.proofList
        }
        return await UpdateProof(params)
    }

    @action
    deleteProof =async value =>{
        const param = new FormData()
        param.append("proofId",value)
        return await DeleteProof(param)
    }

}

export const PROOF_STORE = "proofStore"