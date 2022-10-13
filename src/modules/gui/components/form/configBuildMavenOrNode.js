import React,{Fragment,useContext} from "react";
import {Form,Input} from "antd";
import configItemStore from "../../store/configItemStore";
import TestContext from "../common/testContext";
import Mirror from "./mirror";
import {observer} from "mobx-react";

const ConfigBuildMavenOrNode = props =>{

    const {configDataStore} = props

    const context = useContext(TestContext)
    const {profileAddress} = configItemStore
    const {setIsPrompt,mavenShellBlock,setMavenShellBlock,buildType} = configDataStore
    const pipelineName = context.pipelineName

    return(
        <Fragment>
            <Form.Item
                name={buildType+"buildAddress"}
                label="文件地址"
                rules={[{required:true, message:"请输入文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+pipelineName}
                    placeholder={`"\/\" 代表当前源的根目录`}
                />
            </Form.Item>
            <Form.Item
                name={buildType+"buildOrder"}
                label="执行命令"
            >
                <Mirror
                    shellBlock={mavenShellBlock}
                    setShellBlock={setMavenShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </Fragment>
    )
}

export default observer(ConfigBuildMavenOrNode)
