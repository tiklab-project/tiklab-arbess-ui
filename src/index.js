import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import enableAxiosCE from "tiklab-enable-axios-ce";
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {messageModuleStores} from "tiklab-message-ui/es/store"
import {initFetch,createContainer} from "tiklab-plugin-ui/es/_utils";
import {ConfigProvider} from "antd";
import {getUser} from "tiklab-core-ui";
import {observer,Provider} from "mobx-react";
import {useTranslation} from "react-i18next";
import routers from "./routes";
import resources from "./common/language/resources";
import {store} from "./store";
import {renderRoutes} from "react-router-config";
import "./index.scss";
import "./assets/font_icon/iconfont";
import "./common/language/i18n";

enableAxiosCE()
const Index = observer(() => {

    const {i18n} = useTranslation()

    const [visible,setVisible] = useState(true);
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

    const userId = getUser() && getUser().userId

    useEffect(()=>{
        privilegeStores.systemRoleStore.getSystemPermissions(userId)
    },[userId])

    useEffect(() => {
        initFetch("post",routers,resources,i18n).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, [])


    if (visible) return <div>加载。。。</div>

    return (
        <PluginContainer.Provider initialState={initPluginData}>
            {/*<ConfigProvider>*/}
                <Provider {...allStore}>
                    <HashRouter >
                        {renderRoutes(initPluginData.routes)}
                    </HashRouter>
                </Provider>
            {/*</ConfigProvider>*/}
        </PluginContainer.Provider>
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))

if (module.hot) {
    module.hot.accept()
}