import React from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";
import Inputs from "./inputs";

const BuildMavenOrNode = props =>{

    const {configDataStore} = props

    const {buildShellBlock,buildType,setBuildShellBlock} = configDataStore

    return(
        <>
            <Inputs
                name={"buildAddress"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"模块地址"}
                mode={buildType}
                addonBefore={"/"}
            />

            <Form.Item name={"buildOrder"} label="执行命令">
                <Mirror
                    name={"buildOrder"}
                    type={buildType}
                    shellBlock={buildShellBlock}
                    setShellBlock={setBuildShellBlock}
                    placeholder={"执行命令"}
                />
            </Form.Item>
        </>
    )
}

export default inject("configDataStore")(observer(BuildMavenOrNode))
