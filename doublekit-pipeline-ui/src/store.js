import PipelineStore from "./modules/pipeline/pipeline/store/pipelineStore";
import ConfigStore from "./modules/config/store/configStore";
import ProofStore from "./modules/config/store/proofStore";
import StructureStore from "./modules/pipeline/common/store/structureStore";
import ConfigCommonStore from "./modules/pipeline/common/store/configCommonStore";

class store{
    constructor() {
        this.PipelineStore=new  PipelineStore(this)
        this.ProofStore=new ProofStore(this)
        this.StructureStore=new StructureStore(this)
        this.ConfigStore=new ConfigStore(this)
        this.ConfigCommonStore=new ConfigCommonStore(this)
    }
}

export default new store()