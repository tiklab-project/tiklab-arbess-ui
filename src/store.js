import {EAM_STORE,EamStore} from "tiklab-eam-ui/es/store";
import {PIPELINE_STORE,PipelineStore} from "./modules/pipeline/store/pipelineStore";
import {STRUCTURE_STORE,StructureStore} from "./modules/project/structure/store/structureStore";
import {STRUCTURELIST_STORE,StructureListStore} from "./modules/project/structure/store/structureListStore";
import {CONFIG_STORE,ConfigStore} from "./modules/config/store/configStore";
import {CONFIGDATA_STORE,ConfigDataStore} from "./modules/config/store/configDataStore";
import {PROOF_STORE,ProofStore} from "./modules/proof/store/proofStore";
import {WORKSPACE_STORE,WorkSpaceStore} from "./modules/project/workSpace/store/workSpaceStore";
import {HOMEPAGE_STORE,HomePageStore} from "./modules/home/store/homePageStore";
import {SETTING_STORE,SettingStore} from "./modules/system/setting/store/settingStore";
import {AUTHORIZE_STORE,AuthorizeStore} from "./modules/config/store/authorizeStore";
import {AUTH_STORE,AuthStore} from "./modules/resources/auth/store/authStore";
import {CODE_STORE,CodeStore} from "./modules/resources/code/store/codeStore";
import {SCAN_STORE,ScanStore} from "./modules/resources/scan/store/scanStore";
import {HOST_STORE,HostStore} from "./modules/resources/host/store/hostStore";
import {THIRDADDRESS_STORE,ThirdAddressStore} from "./modules/system/thirdAddress/store/thirdAddressStore";
import {IDENTIFY_STORE,IdentifyStore} from "./modules/system/identify/store/identifyStore";

import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [STRUCTURE_STORE]:new StructureStore(),
        [STRUCTURELIST_STORE]:new StructureListStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [CONFIGDATA_STORE]:new ConfigDataStore(),
        [PROOF_STORE]:new ProofStore(),
        [WORKSPACE_STORE]:new WorkSpaceStore(),
        [HOMEPAGE_STORE]:new HomePageStore(),
        [SETTING_STORE]:new SettingStore(),
        [AUTHORIZE_STORE]:new AuthorizeStore(),
        [AUTH_STORE]:new AuthStore(),
        [CODE_STORE]:new CodeStore(),
        [SCAN_STORE]:new ScanStore(),
        [HOST_STORE]:new HostStore(),
        [THIRDADDRESS_STORE]:new ThirdAddressStore(),
        [IDENTIFY_STORE]:new IdentifyStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}