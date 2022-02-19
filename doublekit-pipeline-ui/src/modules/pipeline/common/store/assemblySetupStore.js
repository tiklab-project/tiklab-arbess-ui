import {action} from "mobx";
import qs from "qs";

import {
    DeletePipeline,
    UpdatePipeline
} from "../api/assemblySetup";

class AssemblySetupStore{
    constructor(store) {
        this.store = store
    }

    @action
    deletePipeline=(values)=>{
        const params = qs.stringify({'pipelineId': values})
        DeletePipeline(params).then(res=>{
            this.store.PIPELINE_STORE.selectPipelineStatus()
            console.log('删除流水线',res)
        }).catch(error=>{
            console.log(error)
        })

    }

    @action
    updatePipeline=(values)=>{
        let param={
            pipelineId:values.pipelineId,
            pipelineName:values.pipelineName
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(param).then(res=>{
                console.log('重命名',res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }
}

export default AssemblySetupStore