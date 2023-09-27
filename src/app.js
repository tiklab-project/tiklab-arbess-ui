import React,{useEffect,useState} from "react";
import {pluginLoader,PluginProvider} from "tiklab-plugin-core-ui";
import {useTranslation} from "react-i18next";
import {Provider} from "mobx-react";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import resources from "./common/language/Resources";
import "./common/language/I18n";
import "./index.scss";

const App = ({allStore,routes}) => {

    const {i18n} = useTranslation();
    const [visible,setVisible] = useState(true)
    const [initPluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    })

    useEffect(() => {
        pluginLoader(routes,resources,i18n).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, [])

    if (visible) return <div>加载中</div>

    return (
        <PluginProvider store={initPluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        { renderRoutes(initPluginData.routes) }
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginProvider>
    )
}

export default App
