import React,{useState} from "react";
import {Select, Form, Spin} from "antd";
import {inject,observer} from "mobx-react";
import FormsItem from "../FormsItem";
import AuthFind from "../AuthFind";
import {LoadingOutlined} from "@ant-design/icons";
import EmptyText from "../../../../../common/emptyText/EmptyText";

/**
 * xpack
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ArtifactXpack = props => {

    const {taskStore,authorizeStore} = props

    const {updateTask,dataItem} = taskStore
    const {findXPackPutAddress,xpackPutAddress} = authorizeStore

    // 是否显示下拉图标
    const [showArrow,setShoeArrow] = useState(false)

    // 聚焦状态
    const [border,setBorder] = useState(false)

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false)

    /**
     * 获取推送位置
     */
    const onFocus = () =>{
        setBorder(true)
        findXPackPutAddress(dataItem && dataItem.task.authId).then(r=>setSpin(false))
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

    const notFoundContent = isSpin ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <EmptyText/>

    return(
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_putAddress"} label={"推送位置"}>
                <Select
                    showSearch={border}
                    placeholder={border ?"推送位置":"未选择"}
                    className={border?'':'input-hover'}
                    showArrow={showArrow}
                    onMouseEnter={()=>setShoeArrow(true)}
                    onMouseLeave={()=>setShoeArrow(false)}
                    onBlur={()=>setBorder(false)}
                    onFocus={onFocus}
                    onChange={onChange}
                    notFoundContent={notFoundContent}
                    filterOption = {(input, option) =>
                        (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        xpackPutAddress && xpackPutAddress.map(item=>{
                            return <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
                        })
                    }

                </Select>
            </Form.Item>

            <FormsItem
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                isValid={true}
            />
            <FormsItem
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                isValid={true}
            />
            <FormsItem
                name={"version"}
                placeholder={"version"}
                label={"version"}
                isValid={true}
            />
            <FormsItem
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                isValid={true}
            />
            <FormsItem
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                isValid={true}
            />
        </>
    )
}

export default inject("taskStore","authorizeStore")(observer(ArtifactXpack))
