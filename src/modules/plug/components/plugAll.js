import React from "react";
import {PLUGIN_STORE,PluginList} from 'doublekit-plugin-ui'
import {inject,observer} from "mobx-react";

const PlugAll = props =>{
    return  <PluginList {...props}/>
}

export default inject(PLUGIN_STORE)(observer(PlugAll))