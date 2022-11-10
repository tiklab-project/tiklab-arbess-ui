import React,{useContext} from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import Mirror from "./mirror";
import Inputs from "./inputs";
import TestContext from "../common/testContext";

const BuildMavenOrNode = props =>{

    const context = useContext(TestContext)

    const {buildShellBlock,setBuildShellBlock,buildType} = context.configDataStore

    return(
        <>
            <Inputs
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"文件地址"}
                name={"buildAddress"}
                mode={buildType}
                addonbefore={"/"}
            />

            <Form.Item
                name={"buildOrder"}
                label="执行命令"
            >
                <Mirror
                    name={"buildOrder"}
                    type={buildType}
                    shellBlock={buildShellBlock}
                    setShellBlock={setBuildShellBlock}
                />
            </Form.Item>
        </>
    )
}

export default observer(BuildMavenOrNode)
