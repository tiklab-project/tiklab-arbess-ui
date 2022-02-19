import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/pipeline/common/store/configStore";
import AssemblySetupStore from "./modules/pipeline/common/store/assemblySetupStore";
import ProofStore from "./modules/pipeline/pipeline/store/proofStore";

class store{
    constructor() {
        this.PIPELINE_STORE=new  PipelineStore(this)
        this.CONFIG_STORE=new ConfigStore(this)
        this.ASSEMBLYSETUP_STORE=new AssemblySetupStore(this)
        this.PROOF_STORE=new ProofStore(this)
    }
}


export default new store()