/**
 * @Description: k8s部署
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/16
 */
import React from "react";
import FormsMirror from "../FormsMirror";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";
import {observer} from "mobx-react";
import FormsSelect from "../FormsSelect";
import {Select} from "antd";

const DeployK8s = props =>{

    const {taskStore} = props;

    const {updateTask,dataItem} = taskStore;

    /**
     * 配置文件类型
     */
    const changFileType = (value,type) => {
        updateTask({[type]:value})
    }

    return(
        <>
            <FormsAuth />
            <FormsInput
                name={"k8sNamespace"}
                placeholder={"命名空间"}
                label={"命名空间"}
                isRequire={true}
            />
            <FormsSelect
                name={"kubeConfType"}
                label="配置文件类型"
                onChange={value=>changFileType(value,'kubeConfType')}
            >
                <Select.Option value={'txt'}>文本</Select.Option>
                <Select.Option value={'file'}>文件</Select.Option>
            </FormsSelect>
            {
                dataItem.task?.kubeConfType === 'file' ? (
                    <>
                        <FormsInput
                            name={"k8sAddress"}
                            placeholder={"配置文件位置"}
                            label={"配置文件位置"}
                            isRequire={true}
                        />
                        <FormsInput
                            name={"rule"}
                            placeholder={"配置文件匹配规则"}
                            label={"配置文件匹配规则"}
                        />
                    </>
                ) : (
                    <>
                        <FormsMirror
                            name={"k8sJson"}
                            label={"配置文件内容"}
                            placeholder={"配置文件内容"}
                            isRequire={true}
                            language={'yaml'}
                        />
                    </>
                )
            }
        </>
    )
}

export default observer(DeployK8s)

