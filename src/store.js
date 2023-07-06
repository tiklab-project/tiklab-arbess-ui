import {PIPELINE_STORE,PipelineStore} from "./pipeline/pipeline/store/PipelineStore";
import {createContext} from "react";

function createStores() {
    return{
        [PIPELINE_STORE]:new PipelineStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
