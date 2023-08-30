import React,{useState} from "react";
import {Select, Form} from "antd";
import {inject,observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import AuthFind from "../AuthFind";

/**
 * xpack
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ArtifactXpack = props => {

    const {taskStore,xpackStore} = props

    const {updateTask,dataItem} = taskStore
    const {findXPackRpy,xpackRpy} = xpackStore

    // 聚焦状态
    const [border,setBorder] = useState(false)

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false)

    /**
     * 获取推送位置
     */
    const onFocus = () =>{
        setBorder(true)
        setSpin(true)
        findXPackRpy(dataItem.task?.authId).then(r=>setSpin(false))
    }

    /**
     * 改变推送位置
     * @param value
     */
    const onChange = value => {
        updateTask({
            taskId:dataItem.taskId,
            values:{repository: {id:value}}
        })
    }

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_putAddress"} label={"制品库"} rules={[{required:true, message:"制品库不能为空"}]}>
                <FormsSelect
                    label={'推送位置'}
                    border={border}
                    isSpin={isSpin}
                    onBlur={()=>setBorder(false)}
                    onFocus={onFocus}
                    onChange={onChange}
                >
                    {
                        xpackRpy && xpackRpy.map(item=>{
                            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>

            <FormsInput
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                isValid={true}
            />
            <FormsInput
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                isValid={true}
            />
            <FormsInput
                name={"version"}
                placeholder={"version"}
                label={"version"}
                isValid={true}
            />
        </>
    )
}

export default inject("taskStore","xpackStore")(observer(ArtifactXpack))
