import React,{useContext} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import TestContext from "../common/testContext";

const Deploy = props =>{

    const {dataItem} = props

    const context = useContext(TestContext)

    const valueChange = context.valueChange

    const onChange = value =>{
        valueChange(value,authType,deployType)
    }

    return(
        <>
            <Form.Item name="authType" label="部署类型">
                <Select onChange={e=>onChange(e)}>
                    <Select.Option value={1}>结构化部署</Select.Option>
                    <Select.Option value={2}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                shouldUpdate={(prevValues,currentValues)=>prevValues[dataItem.configId+"_authType"]!==currentValues[dataItem.configId+"_authType"]}
            >
                {({ getFieldValue })=>
                    getFieldValue([dataItem.configId+"_authType"]) === 1 ? (
                        <>
                            <DeploySame dataItem={dataItem}/>
                            {
                                deployType==31 ?
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

export default observer(Deploy)