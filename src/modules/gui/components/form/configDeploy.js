import React, {Fragment,useContext,useEffect,useState} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import configItemStore from "../../store/configItemStore";
import DeploySame from "./deploySame";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";

const ConfigDeploy = props =>{

    const {configDataStore} = props


    const context = useContext(TestContext)
    const {getFile,fileAddress,profileAddress} = configItemStore

    const [messageInfo,setMessageInfo] = useState("")
    const {setIsPrompt,deployType,
        virStartShellBlock,setVirStartShellBlock,docStartShellBlock,setDocStartShellBlock,
    } = configDataStore

    const pipelineName = context.pipelineName
    const pipelineId = context.pipelineId

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[pipelineId])

    useEffect(()=>{
        fileAddress()
    },[])

    // useEffect(()=>{
    //     const params = {
    //         pipelineName:pipelineName,
    //         regex:formInitialValues[deployType+"sourceAddress"]
    //     }
    //     if(formInitialValues && formInitialValues[deployType+"sourceAddress"] && pipelineId){
    //         getFile(params).then(res=>{
    //             addMessageInfo(res)
    //         }).catch(error=>{
    //             console.log(error)
    //         })
    //     }else{
    //         setMessageInfo("")
    //     }
    // },[formInitialValues[deployType+"sourceAddress"],pipelineId])


    return(
        <Fragment>
            <Form.Item name={deployType+"deployType"} label="部署类型">
                <Select>
                    <Select.Option value={0}>结构化部署</Select.Option>
                    <Select.Option value={1}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                shouldUpdate={(prevValues,currentValues)=>
                    prevValues[deployType+"deployType"]!==currentValues[deployType+"deployType"]}
            >
                {({ getFieldValue })=>
                    getFieldValue(deployType+"deployType") === 0 ? (        
                        <Fragment>
                                <DeploySame
                                    {...props}
                                    configDataStore={configDataStore}
                                    profileAddress={profileAddress}
                                    messageInfo={messageInfo}
                                    pipelineName={pipelineName}
                                />
                                {deployType == 31 ?
                                    <DeployVir
                                        {...props}
                                        configDataStore={configDataStore}
                                    />
                                    :
                                    <DeployDocker deployType={deployType}/>
                                }
                            </Fragment>) :
                        <Form.Item name="startShell" label="Shell命令" className="noRequired">
                            <Mirror
                                shellBlock={deployType==31?virStartShellBlock:docStartShellBlock}
                                setShellBlock={deployType==31?setVirStartShellBlock:setDocStartShellBlock}
                                setIsPrompt={setIsPrompt}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </Fragment>
    )
}


export default observer(ConfigDeploy)