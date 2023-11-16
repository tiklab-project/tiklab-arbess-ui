import React from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";
import {ArtifactXpack} from "./ArtifactCommon";

/**
 * maven拉取制品
 * @constructor
 */
const ArtifactPullMaven = props => {

    const {taskStore} = props

    const {dataItem,updateTask} = taskStore

    /**
     * 更新
     * @param value
     * @param type
     * @returns {*}
     */
    const onChange = (value,type) => {
        if(type==='pullType'){
            return updateTask({pullType:value})
        }
        return updateTask({repository: {id:value}})
    }

    return (
        <>
            <FormsSelect
                name={"pullType"}
                label={"拉取方式"}
                onChange={e=>onChange(e,'pullType')}
            >
                <Select.Option value={"xpack"}>XPack</Select.Option>
                <Select.Option value={"nexus"}>Nexus</Select.Option>
                <Select.Option value={"ssh"}>SSH</Select.Option>
            </FormsSelect>
            <FormsAuth />
            {
                dataItem.task?.pullType==='ssh' ?
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
                    {
                        dataItem.task?.pullType==='xpack' &&
                        <ArtifactXpack
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
