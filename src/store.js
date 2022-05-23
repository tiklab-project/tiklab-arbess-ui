import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/config/common/store/configStore";
import StructureStore from "./modules/structure/store/structureStore";
import ProofStore from "./modules/config/common/store/proofStore";
import GitAuthorizeStore from "./modules/config/common/store/gitAuthorizeStore";
import ConfigDataStore from "./modules/config/common/store/configDataStore";
import StructureDataStore from "./modules/structure/store/structureDataStore";

class store{
    constructor() {
        this.PipelineStore=new  PipelineStore(this)
        this.ConfigStore=new ConfigStore(this)
        this.StructureStore=new StructureStore(this)
        this.ProofStore=new ProofStore(this)
        this.GitAuthorizeStore=new GitAuthorizeStore(this)
        this.ConfigDataStore=new ConfigDataStore(this)
        this.StructureDataStore=new StructureDataStore(this)
    }
}

export default new store()