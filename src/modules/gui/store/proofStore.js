import {action,observable} from "mobx";

import {
    CreateProof,
    FindpipelineProof,
} from "../api/proof";

export class ProofStore{

    @observable pipelineProofList = []
    @observable systemProofList = []

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
    findpipelineProof =async values =>{
        const params = new FormData()
        params.append("pipelineId",values.pipelineId)
        params.append("userId",values.userId)
        params.append("type",values.type)
        FindpipelineProof(params).then(res=>{
            console.log(res)
            if(res.code===0){
                this.pipelineProofList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

const proofStore = new ProofStore()
export default proofStore;