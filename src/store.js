import {createContext} from "react";

function createStores() {
    return {

    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
