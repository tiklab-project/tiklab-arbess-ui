import React, {useState} from "react";
import {Select} from "antd";
import {inject, observer} from "mobx-react";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

/**
 * maven拉取制品
 * @constructor
 */
const ArtifactPullMaven = props => {

    const {taskStore,xpackStore} = props

    const {dataItem,updateTask} = taskStore
    const {findXPackRpy,xpackRpy} = xpackStore

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false);

    /**
     * 获取拉取位置
     */
    const onFocus = () =>{
        if(!dataItem.task?.authId) return;
        setSpin(true)
        findXPackRpy(dataItem.task?.authId).then(r=>setSpin(false))
    }

    /**
     * 更新
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
                name={dataItem.taskId+"_pullType"}
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
                        <FormsSelect
                            rules={[{required:true, message:"拉取仓库不能为空"}]}
                            name={dataItem.taskId+"_putAddress"}
                            label={'拉取仓库'}
                            isSpin={isSpin}
                            onFocus={onFocus}
                            onChange={e=>onChange(e,'putAddress')}
                        >
                            {
                                xpackRpy && xpackRpy.map(item=>{
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </FormsSelect>
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
                        name={dataItem.taskId+"_transitive"}
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

export default inject("taskStore","xpackStore")(observer(ArtifactPullMaven))
