import React,{useState} from "react";
import {Form,Select,Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import DeployVir from "./DeployVir";
import DeployDocker from "./DeployDocker";
import Mirror from "../CodeBlock";
import FindAuth from "../FindAuth";
import Inputs from "../Inputs";

/**
 * 部署
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Deploy = props =>{

    const {configStore,pipelineStore} = props

    const {updateTaskConfig,dataItem,setDataItem} = configStore
    const {pipeline} = pipelineStore

    const [showArrow,setShowArrow] = useState(false)
    const [border,setBorder] = useState(false)

    // 切换部署方式
    const changDeployType = value => {
        const params = {
            pipeline:{id:pipeline.id},
            taskType:dataItem.type,
            values:{authType:value},
            configId:dataItem.configId,
        }
        updateTaskConfig(params)
        setDataItem({
            authType:value,
            deployId:dataItem.deployId,
            name:dataItem.name,
            type:dataItem.type,
            configId:dataItem.configId
        })
        setBorder(false)
    }

    return(
        <>
            <Form.Item name={dataItem.configId+"_authType"} label="部署方式">
                <Select
                    // bordered={border}
                    showArrow={showArrow}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                    onFocus={()=>setBorder(true)}
                    onBlur={()=>setBorder(false)}
                    onChange={changDeployType}
                    className={`${border?'':'input-hover'}`}
                >
                    <Select.Option value={1}>结构化部署</Select.Option>
                    <Select.Option value={2}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues,currentValues)=> prevValues[dataItem.configId+"_authType"]!==currentValues[dataItem.configId+"_authType"]}>
                {({ getFieldValue })=>
                    getFieldValue([dataItem.configId+"_authType"]) === 1 ? (
                        <>
                            <>
                                <Inputs
                                    name={"localAddress"}
                                    placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                                    label={"应用源文件地址"}
                                    addonBefore={"/"}
                                    dataItem={dataItem}
                                />

                                <FindAuth dataItem={dataItem}/>

                                <Inputs
                                    dataItem={dataItem}
                                    name={"deployAddress"}
                                    placeholder={"部署位置"}
                                    label={"部署位置"}
                                    addonBefore={"/"}
                                    isValid={true}
                                />

                                <Form.Item name={"deployOrder"} label={"部署文件命令"}>
                                    <Mirror
                                        name={"deployOrder"}
                                        placeholder={"部署文件命令"}
                                        dataItem={dataItem}
                                        mirrorValue={dataItem.deployOrder}
                                    />
                                </Form.Item>
                            </>
                            {
                                dataItem.type==31 ?
                                <DeployVir dataItem={dataItem}/>
                                :
                                <DeployDocker dataItem={dataItem}/>
                            }
                        </>) :
                        <>
                            <FindAuth dataItem={dataItem}/>
                            <Form.Item name={"startOrder"} label="Shell命令">
                                <Mirror
                                    name={"startOrder"}
                                    placeholder={"Shell命令"}
                                    dataItem={dataItem}
                                    mirrorValue={dataItem.startOrder}
                                />
                            </Form.Item>
                        </>
                }
            </Form.Item>
        </>
    )
}

export default inject("configStore","pipelineStore")(observer(Deploy))
