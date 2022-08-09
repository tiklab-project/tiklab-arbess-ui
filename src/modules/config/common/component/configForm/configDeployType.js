import React,{Fragment} from "react";
import {Form,Input,Select} from "antd";
import ConfigDeploy from "./configDeploy";
import Mirror from "./mirror";
import {inject,observer} from "mobx-react";

const ConfigDeployType = props =>{

    const {type} = props

    const {configDataStore} = props
    const {linuxShellBlock,setLinuxShellBlock,shellBlock,setShellBlock,setIsPrompt} = configDataStore



    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve()
        } else if (value< 3000) {
            return Promise.reject("最小3000")
        } else if (value > 30000) {
            return Promise.reject("最大30000")
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字")
        } else {
            return Promise.resolve() //验证通过
        }
    }

    return(
        <Fragment>
            <Form.Item name="deployType" label="部署类型" className="noRequired">
                <Select>
                    <Select.Option value={0}>结构化部署</Select.Option>
                    <Select.Option value={1}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.deployType !== currentValues.deployType}>
                {({ getFieldValue })=>
                    getFieldValue("deployType") === 0 ? (
                        <Fragment>
                            <ConfigDeploy/>
                            {type === 31 ?
                                <>
                                    <Form.Item
                                        className="noRequired"
                                        name="startAddress"
                                        label="启动文件地址">
                                        <Input addonBefore={"/"} placeholder=" / 启动文件地址"/>
                                    </Form.Item>
                                    <Form.Item name="startShell" label="启动命令" className="noRequired">
                                        <Mirror
                                            shellBlock={linuxShellBlock}
                                            setShellBlock={setLinuxShellBlock}
                                            setIsPrompt={setIsPrompt}
                                        />
                                    </Form.Item>
                                </>
                                :
                                <>
                                    <Form.Item
                                        className="noRequired"
                                        name="startAddress"
                                        label="dockerfile文件地址">
                                        <Input addonBefore={"/"} placeholder=" / 代表部署位置"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="startPort"
                                        label="启动端口"
                                        rules={[
                                            {required:true, message:"请输入启动端口"},
                                            {validator: validate}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name="mappingPort"
                                        label="映射端口"
                                        rules={[
                                            {required:true, message:"请输入映射端口"},
                                            {validator: validate}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </>
                            }
                        </Fragment>) :
                        <Form.Item name="startShell" label="Shell命令" className="noRequired">
                            <Mirror
                                shellBlock={shellBlock}
                                setShellBlock={setShellBlock}
                                setIsPrompt={setIsPrompt}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </Fragment>
    )
}

export default inject("configDataStore")(observer(ConfigDeployType))
