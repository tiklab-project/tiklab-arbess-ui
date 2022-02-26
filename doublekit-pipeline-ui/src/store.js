import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/pipeline/common/store/configStore";
import AssemblySetupStore from "./modules/pipeline/common/store/assemblySetupStore";
import DeploymentStore from "./modules/deployment/store/deployment";
import ProofStore from "./modules/deployment/store/proofStore";
import StartBuild from "./modules/pipeline/common/store/startBuild";

class store{
    constructor() {
        this.PIPELINE_STORE=new  PipelineStore(this)
        this.CONFIG_STORE=new ConfigStore(this)
        this.ASSEMBLYSETUP_STORE=new AssemblySetupStore(this)
        this.PROOF_STORE=new ProofStore(this)
        this.STARTBUILD_STORE=new StartBuild(this)
        this.DEPLOYMENT_STORE=new DeploymentStore(this)
    }
}


export default new store()