import React from "react";
import {FeatureList, PRIVILEGE_SYSTEM_STORE} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

const PipelineSysDomain = props =>{
    return(
        <div>
            <FeatureList/>
        </div>
    )
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PipelineSysDomain))