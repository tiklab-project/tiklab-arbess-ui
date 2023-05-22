import {EAM_STORE,EamStore} from "tiklab-eam-ui/es/store";
import {PIPELINE_STORE,PipelineStore} from "./pipeline/pipeline/store/PipelineStore";
import {HISTORY_STORE,HistoryStore} from "./pipeline/history/store/HistoryStore";
import {OVERVIEW_STORE,OverviewStore} from "./pipeline/overview/store/OverviewStore";
import {HOMEPAGE_STORE,HomePageStore} from "./home/store/HomePageStore";
import {ENVI_STORE,EnviStore} from "./setting/envi/store/EnviStore";
import {AUTHORIZE_STORE,AuthorizeStore} from "./pipeline/design/processDesign/processDesign/store/AuthorizeStore";
import {AUTH_STORE,AuthStore} from "./setting/auth/store/AuthStore";
import {HOST_STORE,HostStore} from "./setting/authHost/store/HostStore";
import {SERVER_STORE,ServerStore} from "./setting/authServer/store/ServerStore";
import {POSTPROCESS_STORE,PostprocessStore} from "./pipeline/design/postprocess/store/PostprocessStore";
import {TRIGGER_STORE,TriggerStore} from "./pipeline/design/trigger/store/TriggerStore";
import {VARIABLE_STORE,VariableStore} from "./pipeline/design/variable/store/VariableStore";
import {COND_STORE,CondStore} from "./pipeline/design/processDesign/condition/store/ConditionStore";
import {TASK_STORE,TaskStore} from "./pipeline/design/processDesign/processDesign/store/TaskStore";
import {STAGE_STORE,StageStore} from "./pipeline/design/processDesign/processDesign/store/StageStore";
import {TESTON_STORE,TestOnStore} from "./pipeline/design/processDesign/processDesign/store/TestOnStore";
import {XPACK_STORE,XPackStore} from "./pipeline/design/processDesign/processDesign/store/XPackStore";
import {XCODE_STORE,XCodeStore} from "./pipeline/design/processDesign/processDesign/store/XCodeStore";
import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [HISTORY_STORE]:new HistoryStore(),
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
        [TASK_STORE]:new TaskStore(),
        [STAGE_STORE]:new StageStore(),
        [TESTON_STORE]:new TestOnStore(),
        [XPACK_STORE]:new XPackStore(),
        [XCODE_STORE]:new XCodeStore(),
        [EAM_STORE]:new EamStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
