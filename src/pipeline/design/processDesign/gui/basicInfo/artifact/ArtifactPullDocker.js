import React,{useState} from "react";
import {Select} from "antd";
import FormsSelect from "../FormsSelect";
import {inject, observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";

/**
 * docker拉取制品
 * @constructor
 */
const ArtifactPullDocker = props => {
    
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

    const onChange = (value,type) => {
        if(type==='pullType'){
            return updateTask({pullType:value})
        }
        return updateTask({repository: {id:value}})
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
            </FormsSelect>
            <FormsAuth />
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
                name={"dockerImage"}
                placeholder={"拉取镜像名称"}
                label={"拉取镜像名称"}
                isRequire={true}
            />
        </>
    )
}

export default inject("taskStore","xpackStore")(observer(ArtifactPullDocker))
