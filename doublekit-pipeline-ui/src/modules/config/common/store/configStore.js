import {observable, action} from "mobx";
import qs from "qs";

import {
    FindOnePipelineConfigure,
    UpdatePipelineConfig,
} from "../api/config";

class ConfigStore{
    constructor(store) {
        this.store=store
    }

    @observable configureId=''
    @observable gitProofId=''
    @observable deployProofId=''
    @observable codeId=''
    @observable deployId=''
    @observable structureId=''
    @observable testId=''

    @action
    findOnePipelineConfigure=(values)=>{
        const params = qs.stringify({pipelineId: values})
        return new Promise((resolve, reject) => {
            FindOnePipelineConfigure(params).then(res=>{
                console.log('查看流水线配置',res)
                if(res.data.data){
                    this.configureId=res.data.data.configureId
                    this.codeId=res.data.data.pipelineCode.codeId
                    this.deployId=res.data.data.pipelineDeploy.deployId
                    this.structureId=res.data.data.pipelineStructure.structureId
                    this.testId=res.data.data.pipelineTest.testId
                }
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    updatePipelineConfig = values => {
        const params = {
            configureCreateTime:values.configureCreateTime,
            configureId: values.configureId,
            pipeline:{
                pipelineId:values.pipeline
            },
            pipelineCode:{
                codeBranch:values.pipelineCode.codeBranch,
                codeId:values.pipelineCode.codeId,
                codeName:values.pipelineCode.codeName,
                codeType:values.pipelineCode.codeType,
                proofName:values.pipelineCode.proofName,
            },
            pipelineTest:{
                testId: values.pipelineTest.testId,
                testOrder: values.pipelineTest.testOrder,
                testType:values.pipelineTest.testType,
            },
            pipelineStructure:{
                structureAddress: values.pipelineStructure.structureAddress,
                structureId: values.pipelineStructure.structureId,
                structureOrder: values.pipelineStructure.structureOrder,
                structureType: values.pipelineStructure.structureType,
            },
            pipelineDeploy:{
                deployAddress: values.pipelineDeploy.deployAddress,
                deployId: values.pipelineDeploy.deployId,
                deployShell: values.pipelineDeploy.deployShell,
                deployTargetAddress:values.pipelineDeploy.deployTargetAddress,
                deployType:1,
                proofName: values.pipelineDeploy.proofName,
            },
        }
        UpdatePipelineConfig(params).then(res => {
            console.log('更改流水线配置', res)
        }).catch(error => {
            console.log(error)
        })
    }

}

export default ConfigStore
