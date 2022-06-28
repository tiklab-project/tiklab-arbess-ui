import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import routers from "./routes";
import "./index.scss";
import "./assets/font_icon/iconfont";
import resources from "./common/language/resources";
import "./common/language/i18n";
import { Provider } from "mobx-react";
import {store} from "./store";
import {orgStores} from "doublekit-user-ui";
import {privilegeStores} from "doublekit-privilege-ui";
import {initFetch, createContainer} from "doublekit-plugin-ui";
import {getUser} from "doublekit-core-ui";
import {observer} from "mobx-react";
import {renderRoutes} from "react-router-config";

const Index = observer(() => {

    const [initPluginData, setPluginData] = useState({
        languages: resources,
        routes: routers,
        pluginStore: [],
        languageStore: []
    })

    // 全局加载插件store
    const PluginContainer  = createContainer()

    const allStore = {
        ...privilegeStores,
        ...orgStores,
        ...store
    }

    const userInfo = getUser()
    if (userInfo && userInfo.userId) {
        allStore.systemRoleStore.getSystemPermissions(userInfo.userId)
    }

    useEffect(() => {
        initFetch("post", routers, resources).then(res => {
            setPluginData(res)
        })
    }, []);

    return (
        <PluginContainer.Provider initialState={initPluginData}>
            <Provider {...allStore}>
                <HashRouter >
                    {
                        renderRoutes(initPluginData.routes)
                    }
                </HashRouter>
            </Provider>
        </PluginContainer.Provider>
    )
});

ReactDOM.render(<Index/>, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}

