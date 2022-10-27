import {EAM_STORE,EamStore} from "tiklab-eam-ui/es/store";
import {PIPELINE_STORE,PipelineStore} from "./modules/pipeline/store/pipelineStore";
import {STRUCTURE_STORE,StructureStore} from "./modules/project/structure/store/structureStore";
import {STRUCTURELIST_STORE,StructureListStore} from "./modules/project/structure/store/structureListStore";
import {CONFIG_STORE,ConfigStore} from "./modules/config/store/configStore";
import {CONFIGDATA_STORE,ConfigDataStore} from "./modules/config/store/configDataStore";
import {GITEE_STORE,GiteeStore} from "./modules/config/store/giteeStore";
import {GITHUB_STORE,GithubStore} from "./modules/config/store/githubStore";
import {PROOF_STORE,ProofStore} from "./modules/proof/store/proofStore";
import {WORKSPACE_STORE,WorkSpaceStore} from "./modules/project/workSpace/store/workSpaceStore";
import {HOMEPAGE_STORE,HomePageStore} from "./modules/home/store/homePageStore";
import {SETTING_STORE,SettingStore} from "./modules/system/setting/store/settingStore";
import {AUTHORIZE_STORE,AuthorizeStore} from "./modules/config/store/authorizeStore";
import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [STRUCTURE_STORE]:new StructureStore(),
        [STRUCTURELIST_STORE]:new StructureListStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [CONFIGDATA_STORE]:new ConfigDataStore(),
        [GITEE_STORE]:new GiteeStore(),
        [GITHUB_STORE]:new GithubStore(),
        [PROOF_STORE]:new ProofStore(),
        [WORKSPACE_STORE]:new WorkSpaceStore(),
        [HOMEPAGE_STORE]:new HomePageStore(),
        [SETTING_STORE]:new SettingStore(),
        [AUTHORIZE_STORE]:new AuthorizeStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}