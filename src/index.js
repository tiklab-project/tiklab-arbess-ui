import React from "react";
import ReactDOM from "react-dom";
import {enableAxios} from "thoughtware-core-ui";
import {privilegeStores} from "thoughtware-privilege-ui/es/store";
import {orgStores} from "thoughtware-user-ui/es/store";
import {observer} from "mobx-react";
import {store} from "./store";
import routes from "./routes";
import App from "./app";

enableAxios()
const Index = observer(() => {

    const allStore = {
        ...privilegeStores,
        ...orgStores,
        ...store
    }

    return (
        <App
            routes={routes}
            allStore={allStore}
        />
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))

if(module.hot){
    module.hot.accept()
}
