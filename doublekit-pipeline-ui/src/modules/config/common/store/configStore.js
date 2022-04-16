import {observable, action, values} from "mobx";

import {
    CreateCode,
    UpdateConfigure,
    CreateTest,
    CreateStructure,
    CreateDeploy,
    FindAllConfigure
} from '../api/config'

class ConfigStore{
    constructor(store) {
        this.store=store
    }


    @action
    createCode = values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        return new Promise((resolve, reject) => {
            CreateCode(params).then(res=>{
                console.log('代码源',res)
                localStorage.setItem('codeId',res.data.data)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    createTest = values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        return new Promise((resolve, reject) => {
            CreateTest(params).then(res=>{
                console.log('测试',res)
                localStorage.setItem('testId',res.data.data)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    createStructure = values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        return new Promise((resolve, reject) => {
            CreateStructure(params).then(res=>{
                console.log('构建',res)
                localStorage.setItem('structureId',res.data.data)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    createDeploy =async values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        return new Promise((resolve, reject) => {
            CreateDeploy(params).then(res=>{
                console.log('部署',res)
                localStorage.setItem('deployId',res.data.data)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    updateConfigure = values =>{
        const params = {
            configureCreateTime:values.configureCreateTime,
            pipelineCode:{
                codeId:values.pipelineCode.codeId,
                codeType:values.pipelineCode.codeType,
                codeBranch:values.pipelineCode.codeBranch,
                codeName:values.pipelineCode.codeName,
                proofName:values.pipelineCode.proofName,
            },
            pipelineTest:{
                testId:values.pipelineTest.testId,
                testType:values.pipelineTest.testType,
                testOrder:values.pipelineTest.testOrder,
            },
            pipelineStructure:{
                structureId:values.pipelineStructure.structureId,
                structureType:values.pipelineStructure.structureType,
                structureAddress: values.pipelineStructure.structureAddress,
                structureOrder: values.pipelineStructure.structureOrder,
            },
            pipelineDeploy:{
                deployId:values.pipelineDeploy.deployId,
                deployType:values.pipelineDeploy.deployType,
                deployAddress: values.pipelineDeploy.deployAddress,
                deployShell: values.pipelineDeploy.deployShell,
                deployTargetAddress:values.pipelineDeploy.deployTargetAddress,
                proofName: values.pipelineDeploy.proofName,
                dockerPort:values.pipelineDeploy.dockerPort,
                mappingPort:values.pipelineDeploy.mappingPort,
            },
        }
        const param = new FormData()
        param.append('pipelineId',values.pipelineId)
        param.append('params',JSON.stringify(params))
        UpdateConfigure(param).then(res=>{
            console.log('更新流水线配置',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAllConfigure =async values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        return new Promise((resolve, reject) => {
            FindAllConfigure(params).then(res=>{
                console.log('查看所有配置',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export default ConfigStore
