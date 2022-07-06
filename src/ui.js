import {orgStores} from "doublekit-user-ui";
import {privilegeStores} from 'doublekit-privilege-ui';
import {stores as portalStores} from 'doublekit-eam-ui';
import {store} from "./module/store";
import resources from './module/common/language/resources';
import pipelineSassRoutes from "./module/routesSass";

const pipelineStore = {
    ...orgStores,
    ...privilegeStores,
    ...portalStores,
    ...store
}

export {
    pipelineSassRoutes,
    pipelineStore,
    resources,
}
