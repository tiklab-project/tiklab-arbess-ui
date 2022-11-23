import {EAM_STORE,EamStore} from "tiklab-eam-ui/es/store";
import {PIPELINE_STORE,PipelineStore} from "./modules/pipeline/store/pipelineStore";
import {STRUCTURE_STORE,StructureStore} from "./modules/project/structure/store/structureStore";
import {CONFIG_STORE,ConfigStore} from "./modules/config/store/configStore";
import {CONFIGDATA_STORE,ConfigDataStore} from "./modules/config/store/configDataStore";
import {SURVEY_STORE,SurveyStore} from "./modules/project/survey/store/surveyStore";
import {HOMEPAGE_STORE,HomePageStore} from "./modules/home/store/homePageStore";
import {ENVI_STORE,EnviStore} from "./modules/resources/envi/store/enviStore";
import {AUTHORIZE_STORE,AuthorizeStore} from "./modules/config/store/authorizeStore";
import {AUTH_STORE,AuthStore} from "./modules/resources/auth/store/authStore";
import {HOST_STORE,HostStore} from "./modules/resources/host/store/hostStore";
import {SERVER_STORE,ServerStore} from "./modules/resources/server/store/serverStore";

import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [STRUCTURE_STORE]:new StructureStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [CONFIGDATA_STORE]:new ConfigDataStore(),
        [SURVEY_STORE]:new SurveyStore(),
        [HOMEPAGE_STORE]:new HomePageStore(),
        [ENVI_STORE]:new EnviStore(),
        [AUTHORIZE_STORE]:new AuthorizeStore(),
        [AUTH_STORE]:new AuthStore(),
        [HOST_STORE]:new HostStore(),
        [SERVER_STORE]:new ServerStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}