import {observable,action} from "mobx";

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
            matFlow:{ matflowId:values.matFlow.matflowId },
            matFlowCode:{
                codeId:values.matFlowCode.codeId,
                sort:values.matFlowCode.sort,
                type:values.matFlowCode.type,
                codeBranch:values.matFlowCode.codeBranch,
                codeName:values.matFlowCode.codeName,
                proof:{ proofId:values.matFlowCode.proof.proofId }
            },
            matFlowTest:{
                testId:values.matFlowTest.testId,
                sort:values.matFlowTest.sort,
                testAlias:values.matFlowTest.testAlias,
                type:values.matFlowTest.type,
                testOrder:values.matFlowTest.testOrder,
            },
            matFlowBuild:{
                buildId:values.matFlowBuild.buildId,
                sort:values.matFlowBuild.sort,
                buildAlias:values.matFlowBuild.buildAlias,
                type:values.matFlowBuild.type,
                buildAddress: values.matFlowBuild.buildAddress,
                buildOrder: values.matFlowBuild.buildOrder,
            },
            matFlowDeploy:{
                deployId:values.matFlowDeploy.deployId,
                sort:values.matFlowDeploy.sort,
                deployAlias:values.matFlowDeploy.deployAlias,
                type:values.matFlowDeploy.type,
                sshIp:values.matFlowDeploy.sshIp,
                sshPort:values.matFlowDeploy.sshPort,
                deployAddress: values.matFlowDeploy.deployAddress,
                startShell: values.matFlowDeploy.startShell,
                sourceAddress:values.matFlowDeploy.sourceAddress,
                startPort:values.matFlowDeploy.startPort,
                mappingPort:values.matFlowDeploy.mappingPort,
                deployType:values.matFlowDeploy.deployType,
                startAddress:values.matFlowDeploy.startAddress,
                deployOrder:values.matFlowDeploy.deployOrder,
                proof:{ proofId:values.matFlowDeploy.proof.proofId }
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
        param.append("matFlowId", values)
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
