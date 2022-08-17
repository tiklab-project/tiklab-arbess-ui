import React,{Fragment} from "react";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import FormView from "../formView/formView";

const ConfigView = props =>{

    const {view,del,onFinish,form,matFlowStore,configDataStore} = props
    const {matFlowId} = matFlowStore
    const pluginStore = useSelector(state =>state.pluginStore)

    return view === 1 ?
        <FormView
            del={del}
            form={form}
            onFinish={onFinish}
            matFlowId={matFlowId}
        />
        :
        <Fragment>
            {
                !getVersionInfo().expired ?
                    <RemoteUmdComponent
                        {...props}
                        point={"gui"}
                        pluginStore={pluginStore}
                        isModalType={true}
                        extraProps={{
                            matFlowStore,
                            configDataStore,
                            form,
                            onFinish,
                            del
                        }}
                    />
                    :null
            }
        </Fragment>
}

export default ConfigView