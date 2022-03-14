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
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureBranch:values.configureBranch,
            configureCodeStructure:values.configureCodeStructure,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureTargetAddress: values.configureTargetAddress,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:values.configureCreateTime,
            configureShell:values.configureShell,
            pipelineId:  values.pipelineId,
            deployProofId: values.deployProofId,
            gitProofId: values.gitProofId,
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
                if(res.data.data){
                    localStorage.setItem('configureId',res.data.data.configureId)
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
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureBranch:values.configureBranch,
            configureCodeStructure:values.configureCodeStructure,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureTargetAddress: values.configureTargetAddress,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:values.configureCreateTime,
            configureShell:values.configureShell,
            pipelineId:  values.pipelineId,
            deployProofId: values.deployProofId,
            gitProofId: values.gitProofId,
            configureId: values.configureId,
        }
        UpdatePipelineConfig(params).then(res => {
            console.log('更改流水线配置', res)
        }).catch(error => {
            console.log(error)
        })
    }

}

export default ConfigStore
