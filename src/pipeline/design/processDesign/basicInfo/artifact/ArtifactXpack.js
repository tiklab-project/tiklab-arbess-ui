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
    const {findXPackPutAddress,xpackPutAddress} = xpackStore

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
        findXPackPutAddress(dataItem.task?.authId).then(r=>setSpin(false))
    }

    /**
     * 改变推送位置
     * @param value
     */
    const onChange = value => {
        updateTask({
            taskId:dataItem.taskId,
            values:{putAddress:value}
        })
    }

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_putAddress"} label={"推送位置"}>
                <FormsSelect
                    label={'推送位置'}
                    border={border}
                    isSpin={isSpin}
                    onBlur={()=>setBorder(false)}
                    onFocus={onFocus}
                    onChange={onChange}
                >
                    {
                        xpackPutAddress && xpackPutAddress.map(item=>{
                            return <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
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
            <FormsInput
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                isValid={true}
            />
            <FormsInput
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                isValid={true}
            />
        </>
    )
}

export default inject("taskStore","xpackStore")(observer(ArtifactXpack))
