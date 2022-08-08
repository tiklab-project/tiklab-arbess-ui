import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import enableAxiosCE from 'tiklab-enable-axios-ce'
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {initFetch,createContainer} from "tiklab-plugin-ui/es/_utils";
import {observer,Provider} from "mobx-react";
import routers from "./routes";
import resources from "./common/language/resources";
import {store} from "./store";
import {renderRoutes} from "react-router-config";
import "./index.scss";
import "./assets/font_icon/iconfont";
import "./common/language/i18n";

enableAxiosCE()

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
                    {renderRoutes(initPluginData.routes)}
                </HashRouter>
            </Provider>
        </PluginContainer.Provider>
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))
