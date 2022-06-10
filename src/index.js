import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import routers from "./routes";
import './index.scss'
import './assets/font_icon/iconfont'
import { Provider } from 'mobx-react';
import {store} from './store';
import {orgStores} from 'doublekit-user-ui';
import {privilegeStores} from 'doublekit-privilege-ui';
import {getUser} from 'doublekit-core-ui'
import {observer} from "mobx-react";
import App from './app';
import './common/language/i18n'

const Index = observer(() => {
    const allStore = {
        ...privilegeStores,
        ...orgStores,
        ...store
    }
    // allStore.authConfigStore.getFindAuthConfig()
    const userInfo = getUser()

    if (userInfo && userInfo.userId) {
        allStore.systemRoleStore.getSystemPermissions(userInfo.userId)
    }
    allStore.pluginsStore.initLoadPlugin(fetchMethod, pluginAddressUrl)

    // useLoadLanguage(resources, method, plugin_url, 'zh')

    // 把所有的项目中的路由全部加载到插件store中。
    allStore.pluginsStore.setProjectRouter(routers)

    return (
        <Provider {...allStore}>
            <HashRouter >
                <App />
            </HashRouter>
        </Provider>
    )
});

ReactDOM.render(<Index/>, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}

