import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import enableAxiosCE from "tiklab-enable-axios-ce";
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {messageModuleStores} from "tiklab-message-ui/es/store"
import {initFetch,createContainer} from "tiklab-plugin-ui/es/_utils";
import {observer,Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import routers from "./routes";
import resources from "./common/language/resources";
import {store} from "./store";
import {Loading} from "./modules/common/loading/loading";
import "./index.scss";
import "./assets/font_icon/iconfont";
import "./common/language/i18n";

enableAxiosCE()
const Index = observer(() => {

    const [visible,setVisible] = useState(true)
    const [initPluginData,setPluginData] = useState({
        languages: resources,
        routes: routers,
        pluginStore: [],
        languageStore: []
    })

    // 全局加载插件store
    const PluginContainer  = createContainer()

    const allStore = {
        ...privilegeStores,
        ...messageModuleStores,
        ...orgStores,
        ...store
    }

    useEffect(() => {
        initFetch("post",routers,resources).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, [])

    if (visible) return <Loading/>

    return (
        <PluginContainer.Provider initialState={initPluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter >
                        {renderRoutes(initPluginData.routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginContainer.Provider>
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))
