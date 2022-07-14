import {EAM_STORE,EamStore} from "doublekit-eam-ui";
import {PIPELINE_STORE,PipelineStore} from "./modules/pipeline/pipeline/store/pipelineStore";
import {STRUCTURE_STORE,StructureStore} from "./modules/project/structure/store/structureStore";
import {STRUCTURELIST_STORE,StructureListStore} from "./modules/project/structure/store/structureListStore";
import {CONFIG_STORE,ConfigStore} from "./modules/config/common/store/configStore";
import {CONFIGDATA_STORE,ConfigDataStore} from "./modules/config/common/store/configDataStore";
import {CONFIGITEM_STORE,ConfigItemStore} from "./modules/config/common/store/configItemStore";
import {GITEE_STORE,GiteeStore} from "./modules/config/common/store/giteeStore";
import {GITHUB_STORE,GithubStore} from "./modules/config/common/store/githubStore";
import {PROOF_STORE,ProofStore} from "./modules/proof/store/proofStore";
import {WORKSPACE_STORE,WorkSpaceStore} from "./modules/project/workSpace/store/workSpaceStore";
import {HOMEPAGE_STORE,HomePageStore} from "./modules/homePage/store/homePageStore";
import {PIPELINECOLLECT_STORE,PipelineCollectStore} from "./modules/pipeline/pipelineCollect/store/pipelineCollectStore";
import {MESSAGE_STORE,MessageStore} from "./modules/system/message/store/messageStore";
import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [STRUCTURE_STORE]:new StructureStore(),
        [STRUCTURELIST_STORE]:new StructureListStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [CONFIGDATA_STORE]:new ConfigDataStore(),
        [CONFIGITEM_STORE]:new ConfigItemStore(),
        [GITEE_STORE]:new GiteeStore(),
        [GITHUB_STORE]:new GithubStore(),
        [PROOF_STORE]:new ProofStore(),
        [WORKSPACE_STORE]:new WorkSpaceStore(),
        [HOMEPAGE_STORE]:new HomePageStore(),
        [PIPELINECOLLECT_STORE]:new PipelineCollectStore(),
        [MESSAGE_STORE]:new MessageStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}