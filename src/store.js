import {EAM_STORE,EamStore} from "tiklab-eam-ui/es/store";
import {PIPELINE_STORE,PipelineStore} from "./pipeline/pipeline/store/PipelineStore";
import {HISTORY_STORE,HistoryStore} from "./pipeline/history/store/HistoryStore";
import {CONFIG_STORE,ConfigStore} from "./design/tasks/tasks/store/ConfigStore";
import {OVERVIEW_STORE,OverviewStore} from "./pipeline/overview/store/OverviewStore";
import {HOMEPAGE_STORE,HomePageStore} from "./home/store/HomePageStore";
import {ENVI_STORE,EnviStore} from "./setting/envi/store/EnviStore";
import {AUTHORIZE_STORE,AuthorizeStore} from "./design/tasks/tasks/store/AuthorizeStore";
import {AUTH_STORE,AuthStore} from "./setting/auth/store/AuthStore";
import {HOST_STORE,HostStore} from "./setting/authHost/store/HostStore";
import {SERVER_STORE,ServerStore} from "./setting/authServer/store/ServerStore";
import {POSTPROCESS_STORE,PostprocessStore} from "./design/postprocess/store/PostprocessStore";
import {TRIGGER_STORE,TriggerStore} from "./design/trigger/store/TriggerStore";
import {VARIABLE_STORE,VariableStore} from "./design/variable/store/VariableStore";
import {COND_STORE,CondStore} from "./design/tasks/condition/store/ConditionStore";

import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [HISTORY_STORE]:new HistoryStore(),
        [CONFIG_STORE]:new ConfigStore(),
        [OVERVIEW_STORE]:new OverviewStore(),
        [HOMEPAGE_STORE]:new HomePageStore(),
        [ENVI_STORE]:new EnviStore(),
        [AUTHORIZE_STORE]:new AuthorizeStore(),
        [AUTH_STORE]:new AuthStore(),
        [HOST_STORE]:new HostStore(),
        [SERVER_STORE]:new ServerStore(),
        [POSTPROCESS_STORE]:new PostprocessStore(),
        [TRIGGER_STORE]:new TriggerStore(),
        [VARIABLE_STORE]:new VariableStore(),
        [COND_STORE]:new CondStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
