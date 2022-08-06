import React,{Fragment} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const ConfigStructureMavenOrNode = props =>{

    const {configDataStore,configItemStore,matFlowStore} = props

    const {setIsPrompt,mavenShellBlock,setMavenShellBlock} = configDataStore
    const {profileAddress} = configItemStore
    const {matFlowName} = matFlowStore

    return(
        <Fragment>
            <Form.Item
                name="structureAddress"
                label="文件地址"
                rules={[{required:true,message:"请输入文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+matFlowName}
                    placeholder={`"\/\" 代表当前源的根目录`}
                />
            </Form.Item>
            <Form.Item
                name="structureOrder"
                label="执行命令"
                className="required-self"
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

export default inject("configDataStore","configItemStore","matFlowStore")(observer(ConfigStructureMavenOrNode))
