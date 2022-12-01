import React,{useContext} from "react";
import {Form,Select} from "antd";
import Mirror from "./mirror";
import {observer} from "mobx-react";
import DeployVir from "./deployVir";
import DeployDocker from "./deployDocker";
import DeploySame from "./deploySame";
import TestContext from "../common/testContext";

const Deploy = props =>{

    const context = useContext(TestContext)

    const {deployType,deployShellBlock,setDeployShellBlock} = context.configDataStore
    const valueChange = context.valueChange

    const onChange = value =>{
        valueChange(value,"authType",deployType)
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
                shouldUpdate={(prevValues,currentValues)=> prevValues.authType!==currentValues.authType}
            >
                {({ getFieldValue })=>
                    getFieldValue("authType") === 1 ? (
                        <>
                            <DeploySame configdatastore={context.configDataStore}/>
                            {
                                deployType==31 ?
                                <DeployVir configDatastore={context.configDataStore}/>
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
                                placeholder={"Shell命令"}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </>
    )
}

export default observer(Deploy)