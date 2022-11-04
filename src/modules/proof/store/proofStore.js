import {action,observable} from "mobx";

import {
    CreateProof,
    FindOneProof,
    FindPipelineProof,
    UpdateProof,
    DeleteProof,

    CreateAuthBasic,
    UpdateAuthBasic,
    DeleteAuthBasic,
    FindAllAuthBasic,
} from "../api/proof";

import {getUser} from "tiklab-core-ui";

export class ProofStore{

    @observable proofList = []
    @observable fresh = false
    @observable authBasicList = []

    @action
    setFresh = value =>{
        this.fresh = value
    }

    @action
    createProof =async values =>{
        const params = {
            user:{id:getUser().userId},
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
        const data = await CreateProof(params)
        if(data.code===0){
            this.fresh = !this.fresh
        }
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
        params.append("userId",getUser().userId)
        params.append("type",values.type)
        const data = await  FindPipelineProof(params)
        if(data.code===0&&data.data){
            this.proofList = data.data
        }
    }

    @action
    updateProof =async values =>{
        const params = {
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
        const data = await UpdateProof(params)
        if(data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    @action
    deleteProof =async value =>{
        const param = new FormData()
        param.append("proofId",value)
        const data = await DeleteProof(param)
        if(data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    @action
    findAllAuthBasic = () =>{
        FindAllAuthBasic().then(res=>{
            if(res.code===0 && res.data){
                this.authBasicList = res.data
            }
        }).catch(err=>{
            console.log(err)
        })
    }


}

export const PROOF_STORE = "proofStore"