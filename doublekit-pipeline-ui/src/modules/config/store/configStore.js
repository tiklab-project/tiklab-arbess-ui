import {observable, action} from "mobx";
import qs from "qs";

import {
    SelectPipelineConfig,
    UpdatePipelineConfig,
    CreatePipelineConfigure,
} from "../api/config";

class ConfigStore{
    constructor(store) {
        this.store=store
    }

    @observable configureId=''

    @action
    createPipelineConfigure=values=>{
        let params = {
            configureBranch:values.configureBranch,
            configureDeployIp: values.configureDeployIp,
            configureTargetAddress: values.configureTargetAddress,
            proofIdDeploy: values.proofIdDeploy,
            proofId: values.proofId,
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:values.configureCreateTime,
            pipelineId:  values.pipelineId,
        }
        CreatePipelineConfigure(params).then(res=>{
            this.configureId=res.data.data
            localStorage.setItem('configureId',this.configureId)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    selectPipelineConfig=(values)=>{
        const params = qs.stringify({pipelineId: values})
        return new Promise((resolve, reject) => {
            SelectPipelineConfig(params).then(res=>{
                console.log('查看流水线配置',res)
                this.pipelineConfig=res.data
                if(!res.data.data) {
                    localStorage.setItem('proofId', null)
                }else {
                    localStorage.setItem('proofId',res.data.data.proofIdStructure)
                }
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    updatePipelineConfig=values=> {
        let params = {
            configureBranch:values.configureBranch,
            configureDeployIp: values.configureDeployIp,
            configureTargetAddress: values.configureTargetAddress,
            proofIdDeploy: values.proofIdDeploy,
            configureCodeSource: values.configureCodeSource,
            configureCodeSourceAddress: values.configureCodeSourceAddress,
            configureCodeStructure: values.configureCodeStructure,
            configureStructureAddress: values.configureStructureAddress,
            configureStructureOrder: values.configureStructureOrder,
            configureDeployAddress: values.configureDeployAddress,
            configureCreateTime: values.configureCreateTime,
            pipelineId: values.pipelineId,
            proofIdStructure: values.proofIdStructure
        }
        UpdatePipelineConfig(params).then(res => {
            console.log('更改流水线配置', res)
            localStorage.setItem('configureId',res.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

}

export default ConfigStore
