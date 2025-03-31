/**
 * @Description: maven拉取制品
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";
import {ArtifactHadess} from "./ArtifactCommon";
import FormsTool from "../FormsTool";
import {hadess, nexus, ssh, toolJdk, toolMaven} from "../../../../../../../common/utils/Constant";

const ArtifactPullMaven = props => {

    const {taskStore} = props

    const {dataItem,updateTask} = taskStore

    /**
     * 修改任务
     * @param value
     * @param type
     * @returns {*}
     */
    const onChange = (value,type) => {
        if(type==='putAddress'){
            return updateTask({repository: {id:value}})
        }
        return updateTask({[type]:value})
    }

    return (
        <>
            <FormsSelect
                name={"pullType"}
                label={"拉取方式"}
                onChange={e=>onChange(e,'pullType')}
            >
                <Select.Option value={hadess}>Hadess</Select.Option>
                <Select.Option value={nexus}>Nexus</Select.Option>
                <Select.Option value={ssh}>SSH</Select.Option>
            </FormsSelect>
            <FormsAuth />
            {
                dataItem.task?.pullType===ssh ?
                <>
                    <FormsInput
                        name={"remoteAddress"}
                        placeholder={"拉取文件"}
                        label={"拉取文件"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"localAddress"}
                        placeholder={"保存位置"}
                        label={"保存位置"}
                        isRequire={true}
                    />
                </>
                :
                <>
                    <FormsTool
                        scmType={toolJdk}
                    />
                    <FormsTool
                        scmType={toolMaven}
                    />
                    {
                        dataItem.task?.pullType===hadess &&
                        <ArtifactHadess
                            label={'拉取仓库'}
                            dataItem={dataItem}
                            onChange={e=>onChange(e,'putAddress')}
                        />
                    }
                    <FormsInput
                        name={"groupId"}
                        placeholder={"GroupId"}
                        label={"GroupId"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"artifactId"}
                        placeholder={"ArtifactId"}
                        label={"ArtifactId"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"version"}
                        placeholder={"Version"}
                        label={"Version"}
                        isRequire={true}
                    />
                    <FormsSelect
                        name={"transitive"}
                        label={"是否拉取关联依赖"}
                        onChange={e=>onChange(e,'transitive')}
                    >
                        <Select.Option value={true}>是</Select.Option>
                        <Select.Option value={false}>否</Select.Option>
                    </FormsSelect>
                </>
            }
        </>
    )
}

export default observer(ArtifactPullMaven)
