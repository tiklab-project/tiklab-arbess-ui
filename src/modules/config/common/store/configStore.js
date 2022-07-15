import {observable, action} from "mobx";

import {
    UpdateConfigure,
    FindAllConfigure,
} from "../api/config"

export class ConfigStore{

    @action
    updateConfigure = values =>{
        const params ={
            configureCreateTime:values.configureCreateTime,
            user:{ id:values.user.id },
            pipeline:{ pipelineId:values.pipeline.pipelineId },
            pipelineCode:{
                codeId:values.pipelineCode.codeId,
                sort:values.pipelineCode.sort,
                type:values.pipelineCode.type,
                codeBranch:values.pipelineCode.codeBranch,
                codeName:values.pipelineCode.codeName,
                proof:{ proofId:values.pipelineCode.proof.proofId }
            },
            pipelineTest:{
                testId:values.pipelineTest.testId,
                sort:values.pipelineTest.sort,
                testAlias:values.pipelineTest.testAlias,
                type:values.pipelineTest.type,
                testOrder:values.pipelineTest.testOrder,
            },
            pipelineStructure:{
                structureId:values.pipelineStructure.structureId,
                sort:values.pipelineStructure.sort,
                structureAlias:values.pipelineStructure.structureAlias,
                type:values.pipelineStructure.type,
                structureAddress: values.pipelineStructure.structureAddress,
                structureOrder: values.pipelineStructure.structureOrder,
            },
            pipelineDeploy:{
                deployId:values.pipelineDeploy.deployId,
                sort:values.pipelineDeploy.sort,
                deployAlias:values.pipelineDeploy.deployAlias,
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
                proof:{ proofId:values.pipelineDeploy.proof.proofId }
            },
        }
        return new Promise((resolve, reject) => {
            UpdateConfigure(params).then(res=>{
                console.log("更新流水线配置",res)
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
                console.log("查看所有配置",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const CONFIG_STORE = "configStore"
