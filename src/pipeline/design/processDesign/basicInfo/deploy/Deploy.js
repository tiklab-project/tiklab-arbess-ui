import React,{useState} from "react";
import {Form,Select,Modal} from "antd";
import {inject,observer} from "mobx-react";
import DeployVir from "./DeployVir";
import DeployDocker from "./DeployDocker";
import Mirror from "../CodeBlock";
import AuthFind from "../AuthFind";
import FormsItem from "../FormsItem";

/**
 * 部署
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Deploy = props =>{

    const {taskStore} = props

    const {updateTask,dataItem,setDataItem} = taskStore

    const [showArrow,setShowArrow] = useState(false)
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
            {
                dataItem.task && dataItem.task.authType ===2?
                    <>
                        <AuthFind />
                        <Form.Item name={"startOrder"} label="Shell命令">
                            <Mirror
                                name={"startOrder"}
                                placeholder={"Shell命令"}
                            />
                        </Form.Item>
                    </>
                    :
                    <>
                        <FormsItem
                            name={"localAddress"}
                            placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                            label={"应用源文件地址"}
                            addonBefore={"/"}
                        />
                        <AuthFind/>
                        <FormsItem
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
                            <DeployVir dataItem={dataItem}/>
                            :
                            <DeployDocker dataItem={dataItem}/>
                        }
                    </>
                }
        </>
    )
}

export default inject("taskStore")(observer(Deploy))
