import React,{useState} from "react";
import {Select} from "antd";
import {inject, observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import FormsAuth from "../FormsAuth";

/**
 * maven推送制品
 * @param props
 * @returns {Element}
 * @constructor
 */
const ArtifactPushMaven = props =>{

    const {taskStore,xpackStore} = props

    const {updateTask,dataItem} = taskStore
    const {findXPackRpy,xpackRpy} = xpackStore

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false);

    /**
     * 获取推送位置
     */
    const onFocus = () =>{
        if(!dataItem.task?.authId) return;
        setSpin(true)
        findXPackRpy(dataItem.task?.authId).then(r=>setSpin(false))
    }

    const onChange = (value,type) =>{
        if(type==="artifactType"){
            return updateTask({artifactType:value})
        }
        return updateTask({repository: {id:value}})
    }

    return (
        <>
            <FormsSelect
                name={dataItem.taskId+"_artifactType"}
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
                        <FormsSelect
                            rules={[{required:true, message:"推送仓库不能为空"}]}
                            name={dataItem.taskId+"_putAddress"}
                            label={'推送仓库'}
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

export default inject("taskStore","xpackStore")(observer(ArtifactPushMaven))
