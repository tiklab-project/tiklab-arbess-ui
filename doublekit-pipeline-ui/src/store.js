import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/config/config/store/configStore";
import StructureStore from "./modules/structure/structure/store/structureStore";
import ProofStore from "./modules/config/configDetails/store/proofStore";
import GitAuthorizeStore from "./modules/config/configDetails/store/gitAuthorizeStore";

class store{
    constructor() {
        this.PipelineStore=new  PipelineStore(this)
        this.ConfigStore=new ConfigStore(this)
        this.StructureStore=new StructureStore(this)
        this.ProofStore=new ProofStore(this)
        this.GitAuthorizeStore=new GitAuthorizeStore(this)
    }
}

export default new store()