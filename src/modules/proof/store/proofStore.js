import {action, observable} from "mobx";

import {
    CreateProof,
    FindAllProof,
    FindOneProof,
    FindPipelineProof,
} from "../api/proof";

export class ProofStore{

    @observable proofScope = ''
    @observable pipelineProofList = []

    @action
    setProofScope = value =>{
        this.proofScope = value
    }

    @action
    createProof =async values =>{
        const params = {
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            type:values.type,
            pipeline:{
                pipelineId: values.pipeline
            },
            proofPort:values.proofPort,
            proofIp:values.proofIp,
            proofCreateTime:values.proofCreateTime,
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
    findPipelineProof =async value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        FindPipelineProof(param).then(res=>{
            console.log(res)
            this.pipelineProofList = res.data
        }).catch(error=>{
            console.log(error)
        })
    }


}

export const PROOF_STORE = 'proofStore'