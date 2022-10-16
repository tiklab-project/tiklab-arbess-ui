import React,{useEffect,useState,useContext} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import TestContext from "../common/testContext";
import ConfigStore from "../../store/ConfigStore";

const Deploy = props =>{

    const context = useContext(TestContext)
    const {fileAddress,getFile,profileAddress,updateConfigure} = ConfigStore

    const {formInitialValues,deployType,deployShellBlock,setDeployShellBlock} = context.configDataStore
    const pipelineId = context.pipelineId
    const pipelineName = context.pipelineName

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
            regex:formInitialValues.sourceAddress
        }
        if(formInitialValues.sourceAddress && pipelineId){
            getFile(params).then(res=>{
                addMessageInfo(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setMessageInfo("")
        }
    },[formInitialValues.sourceAddress,pipelineId])

    const addMessageInfo = data => {
        if(data.code===0){
            if(data.data){
                setMessageInfo("匹配到文件"+data.data)
            }else setMessageInfo("")
        }
    }
    
    const changDeployType = value => {
        const params = {
            pipelineId,
            taskType:deployType,
            pipelineTest: {deployType:value},
            pipelineCode:{deployType:value},
            pipelineBuild:{deployType:value},
            pipelineDeploy:{deployType:value},
            message:"update"
        }
        updateConfigure(params)
    }

    return(
        <>
            <Form.Item name={"deployType"} label="部署类型" className="noRequired">
                <Select onChange={changDeployType}>
                    <Select.Option value={0}>结构化部署</Select.Option>
                    <Select.Option value={1}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                shouldUpdate={(prevValues,currentValues)=> prevValues.deployType!==currentValues.deployType}
            >
                {({ getFieldValue })=>
                    getFieldValue("deployType") === 0 ? (
                        <>
                            <DeploySame
                                {...props}
                                profileAddress={profileAddress}
                                messageInfo={messageInfo}
                                pipelineName={pipelineName}
                                configDataStore={context.configDataStore}
                            />
                            {
                                deployType==31 ?
                                <DeployVir
                                    {...props}
                                    configDataStore={context.configDataStore}
                                />
                                :
                                <DeployDocker
                                    {...props}
                                    deployType={deployType}
                                />
                            }
                        </>) :
                        <Form.Item name={"startShell"} label="Shell命令">
                            <Mirror
                                name={"startShell"}
                                type={deployType}
                                shellBlock={deployShellBlock}
                                setShellBlock={setDeployShellBlock}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default observer(Deploy)