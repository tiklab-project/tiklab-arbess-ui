import React from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";
import {ArtifactHadess} from "./ArtifactCommon";

/**
 * docker推送制品
 * @param props
 * @returns {Element}
 * @constructor
 */
const ArtifactPushDocker = props =>{

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
                <Select.Option value={"hadess"}>Hadess</Select.Option>
                <Select.Option value={"nexus"}>Nexus</Select.Option>
            </FormsSelect>
            <FormsAuth />
            {
                dataItem.task?.artifactType==='hadess' &&
                <ArtifactHadess
                    label={'推送仓库'}
                    dataItem={dataItem}
                    onChange={e=>onChange(e,'putAddress')}
                />
            }
            <FormsInput
                name={"dockerImage"}
                placeholder={"推送镜像名称"}
                label={"推送镜像名称"}
                isRequire={true}
            />
        </>
    )
}

export default observer(ArtifactPushDocker)
