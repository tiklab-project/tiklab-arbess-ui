import React,{Fragment} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "../../components/configForm/mirror";

const BuildMavenOrNode = props =>{

    const {configDataStore,configItemStore,pipelineStore} = props

    const {setIsPrompt,mavenShellBlock,setMavenShellBlock,isMavenOrNode,nodeShellBlock,setNodeShellBlock} = configDataStore
    const {profileAddress} = configItemStore
    const {pipelineName} = pipelineStore

    return(
        <Fragment>
            <Form.Item
                name={isMavenOrNode===21?"mavenBuildAddress":"nodeBuildAddress"}
                label="文件地址"
                rules={[{required:true,message:"请输入文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+pipelineName}
                    placeholder={`"\/\" 代表当前源的根目录`}
                />
            </Form.Item>
            <Form.Item
                name={isMavenOrNode===21?"mavenBuildOrder":"nodeBuildAddress"}
                label="执行命令"
            >
                <Mirror
                    shellBlock={isMavenOrNode===21?mavenShellBlock:nodeShellBlock}
                    setShellBlock={isMavenOrNode===21?setMavenShellBlock:setNodeShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </Fragment>
    )
}

export default inject("configDataStore","configItemStore","pipelineStore")(observer(BuildMavenOrNode))
