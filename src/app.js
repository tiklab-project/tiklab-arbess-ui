import React from "react";
import {Provider} from "mobx-react";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./common/language/I18n";
import "./index.scss";

const App = ({allStore,routes}) => {

    return (
        <Provider {...allStore}>
            <ConfigProvider locale={zhCN}>
                <HashRouter>
                    { renderRoutes(routes) }
                </HashRouter>
            </ConfigProvider>
        </Provider>
    )
}

export default App
