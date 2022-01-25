/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-29 16:42:01
 */
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import routers from './routers';
import {renderRoutes} from "react-router-config";
import { Provider } from 'mobx-react';
import {store } from "./stores"
import {orgStores} from "doublekit-user-ui";
import {privilegeStores} from 'doublekit-privilege-ui'
import {getUser} from 'doublekit-frame-ui'
import {formStores} from 'doublekit-form-ui'
import {flowStores} from 'doublekit-flow-ui'
import {messageModuleStores} from 'doublekit-message-ui'
import { initPlugins, handelPluginRouter, useLoadLanguage } from "doublekit-plugin-ui";
import './common/language/i18n';
import "./index.scss";
import "./assets/font-icon/iconfont";
import resources from './common/language/resources';
import {observer} from "mobx-react"


const App = observer((props) => {
    useLoadLanguage(resources,fetchMethod, pluginAddressUrl, "zh")
    const allStore = {  
        ...privilegeStores,
        ...orgStores,
        ...formStores,
        ...flowStores,
        ...messageModuleStores
    }
    allStore.authConfigStore.getFindAuthConfig()
    
    const {overallStore} = store;
    const {getPluginConfig} = overallStore;
    useEffect(() => {
        getPluginConfig()
        getPluginConfigIndex()
    }, []);

    const [pData, setData] = useState([]);

    const getPluginConfigIndex = () => {
        initPlugins(fetchMethod,pluginAddressUrl).then(res => {
            setData(res);
        })
    };

    const userInfo = getUser()
    if (userInfo && userInfo.userId) {
        allStore.systemRoleStore.getSystemPermissions(userInfo.userId)
    }
    return (
        <Provider {...allStore} {...store} {...props}>
            <HashRouter >
                <div>
                    {renderRoutes(handelPluginRouter(routers,pData))}
                </div>
            </HashRouter>
        </Provider>
    )
});

ReactDOM.render(<App/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
