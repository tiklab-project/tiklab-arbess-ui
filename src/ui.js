// import {store as pipelineStore} from "./store";
// import routesSaas  from "./routes";
//
// export {
//     routesSaas ,
//     pipelineStore,
// }

import {store as pipelineStore} from "./module/store";
import routesCloud  from "./module/routesCloud";
import App from "./module/app"
import Portal from "././module/home/components/Portal";
import SettingContent from "././module/setting/navigator/SettingContent";

export {
    routesCloud,
    pipelineStore,
    App,
    Portal,
    SettingContent,
}


