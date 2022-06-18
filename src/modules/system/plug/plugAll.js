import React from "react";
import {PLUGIN_STORE,PluginList} from 'doublekit-plugin-ui'
import {inject,observer} from "mobx-react";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

const PlugAll = props =>{
    return (
        <div>
            <SystemBreadcrumb
                firstItem={'插件管理'}
                secondItem={'全部'}
            />
            <PluginList {...props}/>
        </div>
    )
}

export default inject(PLUGIN_STORE)(observer(PlugAll))