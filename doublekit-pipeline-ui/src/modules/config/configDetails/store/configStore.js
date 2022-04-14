import {observable, action, values} from "mobx";
import qs from "qs";

import {
    CreateCode,
    UpdateConfigure,
    CreateTest,
    CreateStructure,
    CreateDeploy,
} from '../api/configDetails'

class ConfigStore{
    constructor(store) {
        this.store=store
    }

    @observable configureId = ' '

    @action
    createCode = values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        CreateCode(params).then(res=>{
            this.configureId = res.data.data
            localStorage.setItem('configureId', this.configureId )
            console.log('添加代码源',res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    createTest =async values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        const data = await CreateTest(params)
        return data.data
    }

    @action
    createStructure =async values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        const data = await CreateStructure(params)
        return data.data
    }

    @action
    createDeploy =async values =>{
        const params = new FormData()
        params.append('pipelineId', values.pipelineId)
        params.append('taskType',values.taskType)
        const data = await CreateDeploy(params)
        return data.data
    }

    @action
    updateConfigure = values =>{
        UpdateConfigure(values).then(res=>{
            console.log('更新流水线配置',res)
        }).catch(error=>{
            console.log(error)
        })
    }
}

export default ConfigStore
