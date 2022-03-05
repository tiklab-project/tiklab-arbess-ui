import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/config/store/configStore";
import ProofStore from "./modules/config/store/proofStore";
import BuildStore from "./modules/pipeline/common/store/buildStore";

class store{
    constructor() {
        this.PIPELINE_STORE=new  PipelineStore(this)
        this.PROOF_STORE=new ProofStore(this)
        this.BUILD_STORE=new BuildStore(this)
        this.CONFIG_STORE=new ConfigStore(this)
    }
}

export default new store()