import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";

class store{
    constructor() {
        this.PIPELINE_STORE=new  PipelineStore(this)
    }
}


export default new store()