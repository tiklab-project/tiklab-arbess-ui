import React, {useContext} from "react";
import ConfigTestUnit from "./configTestUnit";
import ConfigBuildMavenOrNode from "./configBuildMavenOrNode";
import ConfigDeploy from "./configDeploy";
import ConfigCodeGitOrGitlab from "./configCodeGitOrGitlab";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";

const Forms = props =>{

    const {type} = props

    const context = useContext(TestContext)
    const configDataStore = context.configDataStore

    return(
        <>
            {
                (()=>{
                    if (type === 11) {
                        return <ConfigTestUnit {...props} configDataStore={configDataStore}/>
                    } else if (type > 20 && type < 30) {
                        return <ConfigBuildMavenOrNode {...props} configDataStore={configDataStore}/>
                    } else if (type > 30 && type < 40) {
                        return <ConfigDeploy {...props} configDataStore={configDataStore}/>
                    } else {
                        return <ConfigCodeGitOrGitlab {...props} configDataStore={configDataStore}/>
                    }
                })()
            }
        </>
    )
}

export default observer(Forms)