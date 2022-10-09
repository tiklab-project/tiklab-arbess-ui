import React,{useEffect,useState} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {inject,observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";

const Deploy = props =>{

    const {configStore,configDataStore,pipelineStore} = props

    const {formInitialValues,setIsPrompt,deployType,
        virStartShellBlock,setVirStartShellBlock,docStartShellBlock,setDocStartShellBlock,
    } = configDataStore

    const {fileAddress,getFile,profileAddress} = configStore
    const {pipelineId,pipelineName} = pipelineStore

    const [messageInfo,setMessageInfo] = useState("")

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[pipelineId])

    useEffect(()=>{
        fileAddress()
    },[])

    useEffect(()=>{
        const params = {
            pipelineName:pipelineName,
            regex:formInitialValues[deployType+"sourceAddress"]
        }
        if(formInitialValues[deployType+"sourceAddress"] && pipelineId){
            getFile(params).then(res=>{
                addMessageInfo(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setMessageInfo("")
        }
    },[formInitialValues[deployType+"sourceAddress"],pipelineId])

    const addMessageInfo = data => {
        if(data.code===0){
            if(data.data){
                setMessageInfo("匹配到文件"+data.data)
            }else setMessageInfo("")
        }
    }

    return(
        <>
            <Form.Item name={deployType+"deployType"} label="部署类型" className="noRequired">
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
                        <>
                            <DeploySame
                                {...props}
                                configDataStore={configDataStore}
                                profileAddress={profileAddress}
                                messageInfo={messageInfo}
                                pipelineName={pipelineName}
                            />
                            {deployType === 31 ?
                                <DeployVir 
                                    {...props}
                                    configDataStore={configDataStore}
                                />
                                :
                                <DeployDocker deployType={deployType}/>
                            }
                        </>) :
                        <Form.Item name="startShell" label="Shell命令">
                            <Mirror
                                shellBlock={deployType===31?virStartShellBlock:docStartShellBlock}
                                setShellBlock={deployType===31?setVirStartShellBlock:setDocStartShellBlock}
                                setIsPrompt={setIsPrompt}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default inject("configStore","configDataStore","pipelineStore")(observer(Deploy))