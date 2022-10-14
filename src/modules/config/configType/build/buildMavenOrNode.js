import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "../mirror";
import Inputs from "../inputs";

const BuildMavenOrNode = props =>{

    const {configDataStore,configStore,pipelineStore} = props

    const {buildShellBlock,buildType,setBuildShellBlock} = configDataStore
    const {profileAddress} = configStore
    const {pipelineName} = pipelineStore

    return(
        <>
            <Inputs
                {...props}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"文件地址"}
                name={"buildAddress"}
                mode={buildType}
                addonBefore={profileAddress+pipelineName}
            />

            <Form.Item
                name={"buildOrder"}
                label="执行命令"
            >
                <Mirror
                    name={"buildOrder"}
                    type={buildType}
                    pipelineStore={pipelineStore}
                    configStore={configStore}
                    shellBlock={buildShellBlock}
                    setShellBlock={setBuildShellBlock}

                />
            </Form.Item>
        </>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(BuildMavenOrNode))
