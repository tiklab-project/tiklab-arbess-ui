/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-29 17:53:09
 */
import { createContext } from 'react';


import {WIKI_STORE,WikiStore} from "./modules/wiki/wiki/store/wikiStore";
import {WIKIDETAIL_STORE,WikiDetailStore} from "./modules/wiki/common/store/wikiDetailStore";
import {OVERALLSTORE_STORE, OverAllStore} from "./common/store/store";
import {SEARCH_STORE,SearchStore} from "./modules/search/store/search";
import {WIKICATELOGUE_STORE,WikiCatalogueStore} from "./modules/wiki/common/store/wikiLogStore"
import {SLATE_STORE,SlateStore} from "./modules/wiki/common/store/slatestore"
import {TEMPLATE_STORE,TemplateStore} from "./modules/template/store/templateStore"
import {WIKICOMMON_STORE,WikiCommon} from "./modules/wiki/common/store/wikiCommon"
import {SHARE_STORE,ShareStore} from "./modules/share/store/shareStore"
import {WIKIWORK_STORE,WikiWork} from "./modules/wiki/common/store/wikiWork"
import {LOGIN_STATUS, LoginStore} from 'doublekit-frame-ui'

function createStores() {
    return {
        [WIKI_STORE]:new WikiStore(),
        [WIKIDETAIL_STORE]: new WikiDetailStore(),
        [OVERALLSTORE_STORE]: new OverAllStore(),
        [SEARCH_STORE]: new SearchStore(),
        [WIKICATELOGUE_STORE]: new WikiCatalogueStore(),
        [SLATE_STORE]: new SlateStore(),
        [TEMPLATE_STORE]: new TemplateStore(),
        [WIKICOMMON_STORE]: new WikiCommon(),
        [SHARE_STORE]: new ShareStore(),
        [WIKIWORK_STORE]: new WikiWork(),
        [LOGIN_STATUS]: new LoginStore()
    };
}

const store = createStores();

const storeContext = createContext(store);

export {
    store,
    storeContext
}