import React from "react";
import ReactDOM from "react-dom";
import {enableAxiosCE} from "tiklab-core-ui";
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {messageModuleStores} from "tiklab-message-ui/es/store";
import {observer} from "mobx-react";
import {store} from "./store";
import routes from "./routes";
import App from "./app";

enableAxiosCE()
const Index = observer(() => {

    const allStore = {
        ...messageModuleStores,
        ...privilegeStores,
        ...orgStores,
        ...store
    }

    return  <App
                routes={routes}
                allStore={allStore}
            />
})

ReactDOM.render(<Index/>, document.getElementById("root"))

if(module.hot){
    module.hot.accept()
}
