import React,{useState} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "../CodeBlock";
import AuthFind from "../AuthFind";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";

/**
 * linux & docker
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployLinuxOrDocker = props =>{

    const {taskStore} = props

    const {updateTask,dataItem,setDataItem} = taskStore

    const [border,setBorder] = useState(false)

    /**
     * 切换部署方式
     * @param value：部署方式
     */
    const changDeployType = value => {
        updateTask({
            taskId:dataItem.taskId,
            values:{authType:value},
        })
        setDataItem({
            taskName:dataItem.taskName,
            taskType:dataItem.taskType,
            taskId:dataItem.taskId,
            task:{authType:value}
        })
        setBorder(false)
    }

    return(
        <>
            <Form.Item name={dataItem.taskId+"_authType"} label="部署方式">
                <FormsSelect
                    label="部署方式"
                    border={border}
                    onFocus={()=>setBorder(true)}
                    onBlur={()=>setBorder(false)}
                    onChange={changDeployType}
                >
                    <Select.Option value={1}>结构化部署</Select.Option>
                    <Select.Option value={2}>自定义部署</Select.Option>
                </FormsSelect>
            </Form.Item>
            {
                dataItem.task && dataItem.task.authType === 2?
                    <Form.Item name={"startOrder"} label="Shell命令">
                        <Mirror
                            name={"startOrder"}
                            placeholder={"Shell命令"}
                        />
                    </Form.Item>
                    :
                    <>
                        <FormsInput
                            name={"localAddress"}
                            placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                            label={"应用源文件地址"}
                            addonBefore={"/"}
                        />
                        <AuthFind/>
                        <FormsInput
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
                            />
                        </Form.Item>
                        {
                            dataItem.taskType==='liunx' ?
                            <>
                                <FormsInput
                                    name={"startAddress"}
                                    placeholder={"/ 启动文件地址"}
                                    label={"启动文件地址"}
                                    addonBefore={"/"}
                                    isValid={true}
                                />
                                <Form.Item name={"startOrder"} label="启动命令" >
                                    <Mirror
                                        name={"startOrder"}
                                        placeholder={"启动命令"}
                                    />
                                </Form.Item>
                            </>
                            :
                            <FormsInput
                                name={"startAddress"}
                                placeholder={" / 代表部署位置"}
                                label={"dockerfile文件地址"}
                                addonBefore={"/"}
                            />
                        }
                    </>
                }
        </>
    )
}

export default inject("taskStore")(observer(DeployLinuxOrDocker))
