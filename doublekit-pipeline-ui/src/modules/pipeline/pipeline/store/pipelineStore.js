import { observable, action } from "mobx";
import {SelectPipelineQuery,CreatePipeline} from "../api/pipeline";

class PipelineStore{
    constructor(store) {
        this.store=store
    }

    @observable pipelineList=[]

    @action
    createPipeline=(values)=>{
        let param = {
            pipelineName: values.pipelineName,
            pipelineCreateUser: values.pipelineCreateUser,
            pipelineType: values.pipelineType,
            pipelineCreateTime:values.pipelineCreateTime
        }
        CreatePipeline(param).then(res=>{
               console.log(res)
        })
    }

    @action
    selectAllPipelineHistory=()=>{
        SelectPipelineQuery().then(res=>{
            this.pipelineList=res.data.data
        })
    }

}
export default PipelineStore
