import React from "react";
import {Select} from "antd";
import FormsSelect from "../FormsSelect";
import {observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";
import {ArtifactXpack} from "./ArtifactCommon";

/**
 * docker拉取制品
 * @constructor
 */
const ArtifactPullDocker = props => {

    const {taskStore} = props

    const {dataItem,updateTask} = taskStore

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
            </FormsSelect>
            <FormsAuth />
            {
                dataItem.task?.pullType==='xpack' &&
                <ArtifactXpack
                    label={'拉取仓库'}
                    dataItem={dataItem}
                    onChange={e=>onChange(e,'putAddress')}
                />
            }
            <FormsInput
                name={"dockerImage"}
                placeholder={"拉取镜像名称"}
                label={"拉取镜像名称"}
                isRequire={true}
            />
        </>
    )
}

export default observer(ArtifactPullDocker)