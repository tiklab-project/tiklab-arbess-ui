import {action,observable} from "mobx";

import {
    CreateProof,
    FindOneProof,
    FindPipelineProof,
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
            pipeline:{pipelineId: values.pipeline.pipelineId},
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            type:values.type,
            proofPort:values.proofPort,
            proofIp:values.proofIp,
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
    findPipelineProof =async values =>{
        const params = new FormData()
        params.append("pipelineId",values.pipelineId)
        params.append("userId",values.userId)
        params.append("type",values.type)
        FindPipelineProof(params).then(res=>{
            console.log(res)
            this.proofList = res.data
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateProof =async values =>{
        const params = {
            pipeline:{pipelineId: values.pipeline.pipelineId},
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