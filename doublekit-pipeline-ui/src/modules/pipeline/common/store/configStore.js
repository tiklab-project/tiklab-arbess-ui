import {observable, action} from "mobx";
import qs from "qs";

import {
    SelectPipelineConfig,
    UpdatePipelineConfig,
} from '../api/config'

class ConfigStore {
    constructor(store) {
        this.store = store
    }

    @observable pipelineConfig = []
    // @observable proofId=''

    @action
    selectPipelineConfig=(values)=>{
        const params = qs.stringify({pipelineId: values})
        return new Promise((resolve, reject) => {
            SelectPipelineConfig(params).then(res=>{
                console.log('查看流水线配置',res)
                this.pipelineConfig=res.data.data
                localStorage.setItem('proofId',res.data.data.proofId)
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
            configureCodeSource: values.configureCodeSource,
            configureCodeSourceAddress: values.configureCodeSourceAddress,
            configureCodeStructure: values.configureCodeStructure,
            configureStructureAddress: values.configureStructureAddress,
            configureStructureOrder: values.configureStructureOrder,
            configureDeployAddress: values.configureDeployAddress,
            configureCreateTime: values.configureCreateTime,
            pipelineId: values.pipelineId,
            proofId: values.proofId
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