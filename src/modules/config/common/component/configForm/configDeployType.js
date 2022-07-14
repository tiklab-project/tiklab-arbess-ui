import React,{Fragment,} from "react";
import {Form,Select} from "antd";
import ConfigDeployShell from "./configDeployShell";
import ConfigDeployLinux from "./configDeployLinux";
import ConfigDeploy from "./configDeploy";
import ConfigDeployDocker from "./configDeployDocker";

const ConfigDeployType = props =>{

    const {type,del} = props

    const changeStartType = () => {
        del(type)
    }

    return(
        <Fragment>
            <Form.Item name="startType" label="部署类型" className="noRequired">
                <Select onChange={()=>changeStartType()}>
                    <Select.Option value={0}>结构化部署</Select.Option>
                    <Select.Option value={1}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.startType !== currentValues.startType}>
                {({ getFieldValue })=>
                    getFieldValue("startType") === 0 ? (
                        <Fragment>
                            <ConfigDeploy/>
                            {type === 31 ? <ConfigDeployLinux/> : <ConfigDeployDocker/>}
                        </Fragment>) : <ConfigDeployShell/>
                }
            </Form.Item>
        </Fragment>
    )
}

export default ConfigDeployType