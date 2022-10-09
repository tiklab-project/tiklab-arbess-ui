import React,{Fragment} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const BuildMavenOrNode = props =>{

    const {configDataStore,configStore,pipelineStore} = props

    const {setIsPrompt,mavenShellBlock,setMavenShellBlock,buildType,nodeShellBlock,setNodeShellBlock} = configDataStore
    const {profileAddress} = configStore
    const {pipelineName} = pipelineStore

    return(
        <Fragment>
            <Form.Item
                name={buildType+"buildAddress"}
                label="文件地址"
                rules={[{required:true,message:"请输入文件地址"}]}
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
                    shellBlock={buildType===21?mavenShellBlock:nodeShellBlock}
                    setShellBlock={buildType===21?setMavenShellBlock:setNodeShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>
        </Fragment>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(BuildMavenOrNode))
