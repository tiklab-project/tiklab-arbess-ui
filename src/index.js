import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import "./index.scss";
import "./assets/font_icon/iconfont";
import "./common/language/i18n";
import routers from "./routes";
import resources from "./common/language/resources";
import {store} from "./store";
import {orgStores} from "doublekit-user-ui/lib/store";
import {privilegeStores} from "doublekit-privilege-ui/es/store";
import {initFetch,createContainer} from "doublekit-plugin-ui/es/_utils";
import {observer} from "mobx-react";
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";

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

    useEffect(() => {
        initFetch("post", routers, resources).then(res => {
            setPluginData(res)
        })
    }, [])

    return (
        <PluginContainer.Provider initialState={initPluginData}>
            <Provider {...allStore}>
                <HashRouter >
                    { renderRoutes(initPluginData.routes) }
                </HashRouter>
            </Provider>
        </PluginContainer.Provider>
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))
