import React from "react";
import {Select} from "antd";
import {inject,observer} from "mobx-react";
import FormsMirror from "../FormsMirror";
import FormsAuth from "../FormsAuth";
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

    /**
     * 切换部署方式
     */
    const changDeployType = value => {
        updateTask({authType:value})
    }

    return(
        <>
            <FormsSelect
                name={dataItem.taskId+"_authType"}
                label="部署方式"
                onChange={changDeployType}
            >
                <Select.Option value={1}>结构化部署</Select.Option>
                <Select.Option value={2}>自定义部署</Select.Option>
            </FormsSelect>
            {
                dataItem.task?.authType===1?
                    <>
                        <FormsAuth />
                        <FormsInput
                            name={"localAddress"}
                            placeholder={"部署文件"}
                            label={"部署文件"}
                            isRequire={true}
                        />
                        <FormsInput
                            name={"rule"}
                            placeholder={"部署文件匹配规则"}
                            label={"部署文件匹配规则"}
                        />
                        <FormsInput
                            name={"deployAddress"}
                            placeholder={"部署位置"}
                            label={"部署位置"}
                            addonBefore={"/"}
                            isRequire={true}
                        />
                        <FormsMirror
                            name={"deployOrder"}
                            label={"部署命令"}
                            placeholder={"部署命令"}
                        />
                    </>
                    :
                    <FormsMirror
                        name={"startOrder"}
                        label={"Shell命令"}
                        placeholder={"Shell命令"}
                    />
            }
        </>
    )
}

export default inject("taskStore")(observer(DeployLinux))
