import React,{Fragment} from "react";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import FormView from "../formView/formView";

const ConfigView = props =>{

    const {view,isBtn,del,onFinish,form,matFlowStore,configDataStore,pluginStore} = props
    const {matFlowId} = matFlowStore

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
                isBtn ?
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