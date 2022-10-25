import React,{useEffect,useState} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {inject,observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import {CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import "./inputs.scss";

const Deploy = props =>{

    const {configStore,configDataStore,pipelineStore} = props

    const {formInitialValues,deployType,deployShellBlock,setDeployShellBlock} = configDataStore

    const {fileAddress,getFile,profileAddress,updateConfigure} = configStore
    const {pipelineId,pipelineName} = pipelineStore

    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)
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
    
    const changDeployType = value => {
        const params = {
            pipeline:{pipelineId},
            taskType:deployType,
            values:{deployType:value},
            message:"update"
        }
        updateConfigure(params).then(res=>{
            res.code===0 && setIsLoading(3)
        })

        setTimeout(()=>setIsLoading(1),1000)

    }

    const onClick = () =>{
        setIsLoading(2)
    }

    const onFocus = () => {
        setBordered(true)
    }

    const onBlur = () => {
        setBordered(false)
        setIsLoading(1)
    }

    const suffix = () =>{
        switch (isLoading) {
            case 1:
                return <span/>
            case 2:
                return <LoadingOutlined style={{color:"#1890ff"}}/>
            case 3:
                return <CheckCircleOutlined style={{color:"#1890ff"}}/>
            case 4:
                return <CloseCircleOutlined style={{color:"red"}}/>
        }
    }

    return(
        <>
            <div className="formView-inputs">
                <Form.Item name={"deployType"} label="部署类型" className="noRequired">
                    <Select
                        bordered={bordered}
                        onClick={onClick}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={changDeployType}
                    >
                        <Select.Option value={0}>结构化部署</Select.Option>
                        <Select.Option value={1}>自定义部署</Select.Option>
                    </Select>
                </Form.Item>
                <div className="formView-inputs-suffix">
                    {suffix(isLoading)}
                </div>
            </div>
            <Form.Item
                shouldUpdate={(prevValues,currentValues)=> prevValues.deployType!==currentValues.deployType}
            >
                {({ getFieldValue })=>
                    getFieldValue("deployType") === 0 ? (
                        <>
                            <DeploySame
                                {...props}
                                configDataStore={configDataStore}
                                profileAddress={profileAddress}
                                messageInfo={messageInfo}
                                pipelineName={pipelineName}
                                pipelineStore={pipelineStore}
                                configStore={configStore}
                            />
                            {
                                deployType==31 ?
                                <DeployVir 
                                    {...props}
                                    configDataStore={configDataStore}
                                    configStore={configStore}
                                />
                                :
                                <DeployDocker deployType={deployType}/>
                            }
                        </>) :
                        <Form.Item name={"startShell"} label="Shell命令">
                            <Mirror
                                pipelineStore={pipelineStore}
                                name={"startShell"}
                                type={deployType}
                                shellBlock={deployShellBlock}
                                setShellBlock={setDeployShellBlock}
                                configStore={configStore}
                                placeholder={"请输入Shell命令"}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default inject("configStore","configDataStore","pipelineStore")(observer(Deploy))