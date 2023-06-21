import {PIPELINE_STORE,PipelineStore} from "./pipeline/pipeline/store/PipelineStore";
import {HOME_STORE,HomeStore} from "./home/store/HomeStore";
import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
        [HOME_STORE]:new HomeStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
