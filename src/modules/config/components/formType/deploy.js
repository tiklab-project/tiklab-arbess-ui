import React,{useEffect,useState} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {inject,observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import SuffixStatus from "./suffixStatus";

const Deploy = props =>{

    const {configStore,configDataStore,pipelineStore} = props

    const {formInitialValues,deployType,deployShellBlock,setDeployShellBlock} = configDataStore

    const {getFile,updateConfigure} = configStore
    const {pipelineId,pipeline} = pipelineStore

    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)
    const [messageInfo,setMessageInfo] = useState("")

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[pipelineId])

    useEffect(()=>{
        const params = {
            pipelineName:pipeline && pipeline.pipelineName,
            regex:formInitialValues.sourceAddress
        }
        if(formInitialValues.sourceAddress){
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
        setIsLoading(2)
        const params = {
            pipeline:{pipelineId},
            taskType:deployType,
            values:{authType:value},
            message:"update"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                setIsLoading(3)
            }else {
                setIsLoading(4)
            }
            setTimeout(()=>setIsLoading(1),1000)
        })
    }

    const onFocus = () => {
        setBordered(true)
    }

    const onBlur = () => {
        setBordered(false)
    }

    return(
        <>
            <div className="formView-inputs">
                <Form.Item
                    name={"authType"}
                    label="部署方式"
                >
                    <Select
                        bordered={bordered}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={changDeployType}
                    >
                        <Select.Option value={1}>结构化部署</Select.Option>
                        <Select.Option value={2}>自定义部署</Select.Option>
                    </Select>
                </Form.Item>
                <div className="formView-inputs-suffix">
                    <SuffixStatus isLoading={isLoading}/>
                </div>
            </div>
            <Form.Item
                shouldUpdate={(prevValues,currentValues)=> prevValues.authType!==currentValues.authType}
            >
                {({ getFieldValue })=>
                    getFieldValue("authType") === 1 ? (
                        <>
                            <DeploySame
                                configDataStore={configDataStore}
                                messageInfo={messageInfo}
                            />
                            {
                                deployType==31 ?
                                <DeployVir 
                                    configDataStore={configDataStore}
                                />
                                :
                                <DeployDocker deployType={deployType}/>
                            }
                        </>) :
                        <Form.Item name={"startOrder"} label="Shell命令">
                            <Mirror
                                name={"startOrder"}
                                type={deployType}
                                shellBlock={deployShellBlock}
                                setShellBlock={setDeployShellBlock}
                                placeholder={"请输入Shell命令"}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default inject("configStore","configDataStore","pipelineStore")(observer(Deploy))