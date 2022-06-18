import React from "react";
import {PluginList} from 'doublekit-plugin-ui'
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

const PlugAll = props =>{
    return (
        <div>
            <SystemBreadcrumb firstItem={'插件管理'} secondItem={'全部'}/>
            <PluginList {...props}/>
        </div>
    )
}

export default PlugAll