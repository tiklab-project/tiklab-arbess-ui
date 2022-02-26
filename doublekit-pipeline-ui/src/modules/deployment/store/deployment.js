import {observable, action} from "mobx";
import qs from "qs";

import {
    CreatePipelineConfigure,
} from "../api/deployment";


class DeploymentStore{
    constructor(store) {
        this.store=store
    }
    @action
    createPipelineConfigure=values=>{
        let param = {
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:values.configureCreateTime,
            pipelineId:  values.pipelineId,
            proofId:values.proofId
        }
        CreatePipelineConfigure(param).then(res=>{
            localStorage.setItem('configureId',res.data.data)
        }).catch(error=>{
            console.log(error)
        })
    }


}
export default DeploymentStore
