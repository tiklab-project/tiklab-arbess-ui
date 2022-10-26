import React,{useEffect,useState,useContext} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import TestContext from "../common/testContext";

const Deploy = props =>{

    const context = useContext(TestContext)

    const {getFile,profileAddress} = context.configStore
    const {formInitialValues,deployType,deployShellBlock,setDeployShellBlock} = context.configDataStore
    const {pipelineId, pipelineName} = context.pipelineStore
    const valueChange = context.valueChange

    const [messageInfo,setMessageInfo] = useState("")

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[pipelineId])


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

    return(
        <>
            <Form.Item name={"deployType"} label="部署类型" className="noRequired">
                <Select onChange={(e)=>valueChange(e,"deployType",deployType)}>
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
                                profileaddress={profileAddress+pipelineName}
                                messageinfo={messageInfo}
                                configdatastore={context.configDataStore}
                            />
                            {
                                deployType==31 ?
                                <DeployVir
                                    configDatastore={context.configDataStore}
                                />
                                :
                                <DeployDocker
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