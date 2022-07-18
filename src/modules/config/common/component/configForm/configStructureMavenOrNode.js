import React, {Fragment, useState} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "./mirror";

const {TextArea} = Input;

const ConfigStructureMavenOrNode = props =>{

    const {configDataStore,configItemStore} = props
    const {setIsPrompt,mavenShellBlock,setMavenShellBlock} = configDataStore
    const {profileAddress} = configItemStore
    const pipelineName = localStorage.getItem("pipelineName")

    return(
        <Fragment>
            <Form.Item
                name="structureAddress"
                label="文件地址"
                rules={[{required:true, message:"请输入文件地址"}]}
            >
                <Input
                    addonBefore={profileAddress+pipelineName}
                    placeholder={`"\/\" 代表当前源的根目录`}
                />
            </Form.Item>
            <Form.Item
                name="structureOrder"
                label="执行命令"
                className="noRequired"
                rules={[
                    // {required:true, message:"请输入执行命令"},
                    // ({ getFieldValue }) => ({
                    //     validator(rule, value) {
                    //         if (!value) {
                    //             return Promise.reject("请输入执行命令")
                    //         }
                    //         if(mavenShellBlock){
                    //             return Promise.resolve()                            }
                    //         },
                    // }),
                ]}
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

export default inject("configDataStore","configItemStore")(observer(ConfigStructureMavenOrNode))
