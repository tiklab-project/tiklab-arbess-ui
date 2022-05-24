import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/config/common/store/configStore";
import StructureStore from "./modules/structure/store/structureStore";
import ProofStore from "./modules/config/common/store/proofStore";
import GiteeStore from "./modules/config/common/store/giteeStore";
import ConfigDataStore from "./modules/config/common/store/configDataStore";
import StructureDataStore from "./modules/structure/store/structureDataStore";
import GithubStore from "./modules/config/common/store/githubStore";

class store{
    constructor() {
        this.PipelineStore=new  PipelineStore(this)
        this.ConfigStore=new ConfigStore(this)
        this.StructureStore=new StructureStore(this)
        this.ProofStore=new ProofStore(this)
        this.GiteeStore=new GiteeStore(this)
        this.ConfigDataStore=new ConfigDataStore(this)
        this.StructureDataStore=new StructureDataStore(this)
        this.GithubStore=new GithubStore(this)
    }
}

export default new store()