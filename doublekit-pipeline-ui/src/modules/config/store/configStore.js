import {observable, action} from "mobx";
import qs from "qs";

import {
    CreatePipelineConfigure,
    SelectPipelineConfig,
    UpdatePipelineConfig,
} from "../api/config";

class ConfigStore{
    constructor(store) {
        this.store=store
    }

    @observable configureId=''
    @observable gitProofId=''
    @observable deployProofId=''

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
            console.log("创造流水线配置",res)
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
                    this.configureId=res.data.data.configureId
                    this.gitProofId=res.data.data.gitProofId
                    this.deployProofId=res.data.data.deployProofId
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
