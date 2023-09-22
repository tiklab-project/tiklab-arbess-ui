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

    const {taskStore,pipelineStore} = props

    const {updateTask,dataItem,setDataItem} = taskStore

    const {pipeline} = pipelineStore

    const [border,setBorder] = useState(false)

    /**
     * 切换部署方式
     */
    const changDeployType = value => {
        updateTask({
            pipelineId:pipeline.id,
            taskName:dataItem.taskName,
            values:{authType:value},
        })
        setDataItem({
            taskName:dataItem.taskName,
            taskType:dataItem.taskType,
            task:{authType:value}
        })
        setBorder(false)
    }

    return(
        <>
            <Form.Item name={dataItem.taskName+"_authType"} label="部署方式">
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
                        <AuthFind/>
                        <FormsInput
                            name={"deployAddress"}
                            placeholder={"部署位置"}
                            label={"部署位置"}
                            addonBefore={"/"}
                            isValid={true}
                        />
                        <Form.Item name={"deployOrder"} label={"部署命令"}>
                            <Mirror
                                name={"deployOrder"}
                                placeholder={"部署命令"}
                            />
                        </Form.Item>
                        {
                            dataItem.taskType==='liunx' ?
                            null
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

export default inject("taskStore",'pipelineStore')(observer(DeployLinuxOrDocker))
