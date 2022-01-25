/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-05-28 15:09:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-02 14:32:29
 */
import {orgStores} from "doublekit-user-ui";
import {privilegeStores} from 'doublekit-privilege-ui'
import {stores as portalStores} from 'doublekit-frame-ui'
import {formStores} from 'doublekit-form-ui'
import {flowStores} from 'doublekit-flow-ui'
import {messageModuleStores} from 'doublekit-message-ui'
import orgaRouter from "./module/modules/sysmgr/common/components/orgaRouter"
import OrgaAside from "./module/modules/sysmgr/common/components/orgaAside"
import wikiRoutes from "./module/routers";
import {store} from "./module/stores"
import resources from './module/common/language/resources';
const wikiStore = {
    ...orgStores,
    ...privilegeStores,
    ...portalStores,
    ...formStores,
    ...flowStores,
    ...messageModuleStores,
    ...store
}
export {
    wikiRoutes,
    wikiStore,
    orgaRouter,
    OrgaAside,
    resources
}