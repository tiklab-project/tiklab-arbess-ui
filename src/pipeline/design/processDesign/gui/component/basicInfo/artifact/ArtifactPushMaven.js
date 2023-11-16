import React from "react";
import {Select} from "antd";
import { observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";
import {ArtifactXpack} from "./ArtifactCommon";

/**
 * maven推送制品
 * @param props
 * @returns {Element}
 * @constructor
 */
const ArtifactPushMaven = props =>{

    const {taskStore} = props

    const {updateTask,dataItem} = taskStore

    const onChange = (value,type) =>{
        if(type==="artifactType"){
            return updateTask({artifactType:value})
        }
        return updateTask({repository: {id:value}})
    }

    return (
        <>
            <FormsSelect
                name={"artifactType"}
                label={"推送方式"}
                onChange={e=>onChange(e,'artifactType')}
            >
                <Select.Option value={"xpack"}>XPack</Select.Option>
                <Select.Option value={"nexus"}>Nexus</Select.Option>
                <Select.Option value={"ssh"}>SSH</Select.Option>
            </FormsSelect>
            <FormsAuth />

            {
                dataItem.task?.artifactType==='ssh' ?
                <>
                    <FormsInput
                        name={"putAddress"}
                        placeholder={"推送位置"}
                        label={"推送位置"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"fileAddress"}
                        placeholder={"制品文件"}
                        label={"制品文件"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"rule"}
                        placeholder={"制品文件匹配规则"}
                        label={"制品文件匹配规则"}
                    />
                </>
                :
                <>
                    {
                        dataItem.task?.artifactType==='xpack' &&
                        <ArtifactXpack
                            label={'推送仓库'}
                            dataItem={dataItem}
                            onChange={e=>onChange(e,'putAddress')}
                        />
                    }
                    <FormsInput
                        name={"fileAddress"}
                        placeholder={"制品文件"}
                        label={"制品文件"}
                        isRequire={true}
                    />
                    <FormsInput
                        name={"rule"}
                        placeholder={"制品文件匹配规则"}
                        label={"制品文件匹配规则"}
                    />
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
                </>
            }
        </>
    )
}

export default observer(ArtifactPushMaven)
