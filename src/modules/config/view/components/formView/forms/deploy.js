import React,{useState} from "react";
import {Form,Select,Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import Mirror from "./mirror";
import {inject,observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";

const Deploy = props =>{

    const {configStore,pipelineStore,dataItem} = props

    const {updateConfigure,formInitialValues} = configStore
    const {pipelineId} = pipelineStore

    const [bordered,setBordered] = useState(false)
    const [showArrow,setShowArrow] = useState(false)
    
    const changDeployType = value => {
        const params = {
            pipeline:{pipelineId},
            taskType:dataItem.type,
            values:{authType:value},
            configId:dataItem.configId,
        }
        updateConfigure(params)
        formInitialValues[dataItem.configId+"_authType"]=value
    }

    const confirm = value =>{
        Modal.confirm({
            title: "切换",
            icon: <ExclamationCircleOutlined />,
            content: "切换后数据会被删除",
            onOk:()=>confirm(value),
            okText: "确认",
            cancelText: "取消",
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
            <Form.Item name={dataItem.configId+"_authType"} label="部署方式">
                <Select
                    showArrow={showArrow}
                    bordered={bordered}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={changDeployType}
                >
                    <Select.Option value={1}>结构化部署</Select.Option>
                    <Select.Option value={2}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues,currentValues)=> prevValues[dataItem.configId+"_authType"]!==currentValues[dataItem.configId+"_authType"]}>
                {({ getFieldValue })=>
                    getFieldValue([dataItem.configId+"_authType"]) === 1 ? (
                        <>
                            <DeploySame dataItem={dataItem}/>
                            {
                                dataItem.type==31 ?
                                <DeployVir dataItem={dataItem}/>
                                :
                                <DeployDocker dataItem={dataItem}/>
                            }
                        </>) :
                        <Form.Item name={"startOrder"} label="Shell命令">
                            <Mirror
                                name={"startOrder"}
                                placeholder={"Shell命令"}
                                dataItem={dataItem}
                                mirrorValue={dataItem.startOrder}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default inject("configStore","pipelineStore")(observer(Deploy))