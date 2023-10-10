import React,{useState} from "react";
import {Form,Select} from "antd";
import {inject,observer} from "mobx-react";
import Mirror from "../CodeBlock";
import AuthFind from "../AuthFind";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";

/**
 * 主机部署
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployLinux = props =>{

    const {taskStore} = props

    const {updateTask,dataItem} = taskStore

    const [border,setBorder] = useState(false)

    /**
     * 切换部署方式
     */
    const changDeployType = value => {
        setBorder(false)
        updateTask({authType:value})
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
                dataItem?.task?.authType === 2 ?
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
                    </>
                }
        </>
    )
}

export default inject("taskStore")(observer(DeployLinux))
