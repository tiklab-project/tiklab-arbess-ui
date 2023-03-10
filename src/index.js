import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {enableAxiosCE} from "tiklab-core-ui";
import {orgStores,privilegeStores} from "tiklab-user-ui/es/store";
import {messageModuleStores} from "tiklab-message-ui/es/store";
import {PluginProvider,pluginLoader} from 'tiklab-plugin-core-ui';
import {observer,Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import {useTranslation} from "react-i18next";
import {ConfigProvider} from "antd";
import {store} from "./store";
import zhCN from "antd/es/locale/zh_CN";
import routes from "./routes";
import resources from "./common/language/Resources";
import "./assets/font_icon/iconfont";
import "./common/language/I18n";
import "./index.scss";

enableAxiosCE()
const Index = observer(() => {

    const {i18n} = useTranslation();
    const [visible,setVisible] = useState(true)
    const [initPluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    })

    const allStore = {
        ...messageModuleStores,
        ...privilegeStores,
        ...orgStores,
        ...store
    }

    useEffect(() => {
        pluginLoader(routes,resources,i18n).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, [])

    if (visible) return <div>加载。。。</div>

    return (
        <PluginProvider store={initPluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter >
                        {renderRoutes(initPluginData.routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginProvider>
    )

})

ReactDOM.render(<Index/>, document.getElementById("root"))
