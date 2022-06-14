import {PluginStore,PLUGIN_STORE} from "doublekit-plugin-ui";
import {EAM_STORE,EamStore} from 'doublekit-eam-ui';
import {PIPELINE_STORE,PipelineStore} from "./modules/pipeline/pipeline/store/pipelineStore";
import {STRUCTURE_STORE,StructureStore} from "./modules/structure/store/structureStore";
import {CONFIG_STORE,ConfigStore} from "./modules/config/common/store/configStore";
import {CONFIGDATA_STORE,ConfigDataStore} from "./modules/config/common/store/configDataStore";
import {GITEE_STORE,GiteeStore} from "./modules/config/common/store/giteeStore";
import {GITHUB_STORE,GithubStore} from "./modules/config/common/store/githubStore";
import {PROOF_STORE,ProofStore} from "./modules/proof/store/proofStore";
import {WORKSPACE_STORE,WorkSpaceStore} from "./modules/workSpace/store/workSpaceStore";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [STRUCTURE_STORE]:new StructureStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [CONFIGDATA_STORE]:new ConfigDataStore(),
        [GITEE_STORE]:new GiteeStore(),
        [GITHUB_STORE]:new GithubStore(),
        [PROOF_STORE]:new ProofStore(),
        [WORKSPACE_STORE]:new WorkSpaceStore(),
        [PLUGIN_STORE]: new PluginStore(),
        [EAM_STORE]: new EamStore(),
    }
}

const store = createStores();

export {
    store
}