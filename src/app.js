import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import {PLUGIN_STORE,loadLanguage} from "doublekit-plugin-ui";
import {renderRoutes} from "react-router-config";
import { useTranslation } from 'react-i18next';
import resources from './common/language/resources';
import { useVersion } from 'doublekit-eam-ui';

const App = (props) => {
    const {pluginsStore} = props;
    const {routers,languages, isInitLoadPlugin} = pluginsStore;
    const [loading, setLoading] = useState(true);
    const {i18n, t} = useTranslation();
    const [resourcesLanguage, setResources] = useState({});
    useVersion();
    useEffect(() => {
        if (isInitLoadPlugin) {
            setLoading(true)
            console.log(resources)
            loadLanguage(i18n, resources, languages, fetchMethod, 'zh').then(res => {
                const resources2 = {
                    zh:res.zh || {translation:{}}
                }
                setResources(resources2)
            })
        }
    }, [isInitLoadPlugin]);

    Object.keys(resourcesLanguage).map(key => {
        i18n.addResourceBundle(key,'translation', resourcesLanguage[key].translation, true,true)
    })

    return(
        <>
            {
                loading ? renderRoutes(routers) : <div>加载中....</div>
            }
        </>
    )
};

export default inject(PLUGIN_STORE)(observer(App))