import {observable,action} from "mobx";

import {
    UpdateConfigure,
    FindAllConfigure,
} from "../api/config"

export class ConfigStore{

    @action
    updateConfigure = values =>{
        const params ={
            pipelineCode:{
                codeId:values.pipelineCode.codeId,
                sort:values.pipelineCode.sort,
                type:values.pipelineCode.type,
                codeBranch:values.pipelineCode.codeBranch,
                codeName:values.pipelineCode.codeName,
                proof:{ proofId:values.pipelineCode.proof.proofId },
                pipeline:{pipelineId:values.pipelineCode.pipeline.pipelineId },
            },
            pipelineTest:{
                testId:values.pipelineTest.testId,
                sort:values.pipelineTest.sort,
                type:values.pipelineTest.type,
                testOrder:values.pipelineTest.testOrder,
                pipeline:{pipelineId:values.pipelineTest.pipeline.pipelineId },
            },
            pipelineBuild:{
                buildId:values.pipelineBuild.buildId,
                sort:values.pipelineBuild.sort,
                type:values.pipelineBuild.type,
                buildAddress: values.pipelineBuild.buildAddress,
                buildOrder: values.pipelineBuild.buildOrder,
                pipeline:{pipelineId:values.pipelineBuild.pipeline.pipelineId },
            },
            pipelineDeploy:{
                deployId:values.pipelineDeploy.deployId,
                sort:values.pipelineDeploy.sort,
                type:values.pipelineDeploy.type,
                sshIp:values.pipelineDeploy.sshIp,
                sshPort:values.pipelineDeploy.sshPort,
                deployAddress: values.pipelineDeploy.deployAddress,
                startShell: values.pipelineDeploy.startShell,
                sourceAddress:values.pipelineDeploy.sourceAddress,
                startPort:values.pipelineDeploy.startPort,
                mappingPort:values.pipelineDeploy.mappingPort,
                deployType:values.pipelineDeploy.deployType,
                startAddress:values.pipelineDeploy.startAddress,
                deployOrder:values.pipelineDeploy.deployOrder,
                proof:{ proofId:values.pipelineDeploy.proof.proofId },
                pipeline:{pipelineId:values.pipelineDeploy.pipeline.pipelineId },

            },
        }
        return new Promise((resolve, reject) => {
            UpdateConfigure(params).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findAllConfigure = values =>{
        const param = new FormData()
        param.append("pipelineId", values)
        return new Promise((resolve, reject) => {
            FindAllConfigure(param).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const CONFIG_STORE = "configStore"
