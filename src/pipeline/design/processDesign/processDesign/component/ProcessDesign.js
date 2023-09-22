import React from "react";
import {inject,observer,Provider} from "mobx-react";
import condStore from "../store/ConditionStore";
import authorizeStore from "../store/AuthorizeStore";
import testOnStore from "../store/TestOnStore";
import xcodeStore from "../store/XCodeStore";
import xpackStore from "../store/XPackStore";
import authStore from "../../../../../setting/auth/store/AuthStore";
import hostStore from "../../../../../setting/authHost/store/HostStore";
import serverStore from "../../../../../setting/authServer/store/ServerStore";
import Gui from "../../gui/gui/Gui";
import Text from "../../text/Text";

const ProcessDesign = props =>{

    const store = {
        condStore,
        authorizeStore,
        testOnStore,
        xcodeStore,
        xpackStore,
        authStore,
        hostStore,
        serverStore,
    }

    const {pipelineStore} = props

    const {pipeline} = pipelineStore

    return (
        <Provider {...store}>
            {
                pipeline?.view==="text" ?
                    <Text pipelineStore={pipelineStore}/>
                    :
                    <Gui pipelineStore={pipelineStore}/>

            }
        </Provider>
    )
}

export default inject("pipelineStore")(observer(ProcessDesign))