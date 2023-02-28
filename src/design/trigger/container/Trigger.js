import React,{useState,useEffect} from "react";
import {Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
import TriggerAdd from "../components/TriggerAdd";
import Listaction from "../../../common/list/Listaction";
import Btn from "../../../common/btn/Btn";
import "../components/Trigger.scss";

/**
 * 触发器页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Trigger = props =>{

    const {triggerStore,pipelineStore} = props

    const {updateTriggerConfig,deleteTriggerConfig,createTriggerConfig,findAllTriggerConfig,triggerData,isFindTrigger} = triggerStore
    const {pipeline} = pipelineStore

    const [formValue,setFormValue] = useState("")
    const [triggerVisible,setTriggerVisible] = useState(false)

    useEffect(()=>{
        // 初始化触发器
        pipeline && findAllTriggerConfig(pipeline.id)
    },[pipeline,isFindTrigger])

    /**
     * 添加触发器
     */
    const addTrigger = () => {
        setFormValue("")
        setTriggerVisible(true)
    }

    /**
     * 编辑触发器
     * @param text
     * @param record
     */
    const editTrigger = (text,record) => {
        setFormValue(record)
        setTriggerVisible(true)
    }

    /**
     * 删除触发器
     * @param text
     * @param record
     */
    const delTrigger = (text,record) => {
        deleteTriggerConfig(record.configId)
    }

    const columns = [
        {
            title: "执行时间",
            dataIndex: "execTime",
            key: "execTime",
        },
        {
            title: "执行方式",
            dataIndex: "taskType",
            key: "taskType",
            render:(text,record)=>{
                switch (text) {
                    case 1:
                        return "单次触发"
                    case 2:
                        return "周期触发"
                }
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render:(text,record) =>(
                <Listaction
                    edit={()=>editTrigger(text,record)}
                    del={()=>delTrigger(text,record)}
                />
            )
        },
    ]

    return (
        <div className="trigger">
            <div className="trigger-content mf-home-limited">
                <div className="trigger-up">
                    <div className="trigger-up-title">定时触发</div>
                    <div className="trigger-up-num">共{triggerData && triggerData.length?triggerData.length:0}个定时任务</div>
                    <Btn
                        title={"添加"}
                        icon={<PlusOutlined/>}
                        onClick={()=>addTrigger()}
                    />
                    <TriggerAdd
                        triggerVisible={triggerVisible}
                        setTriggerVisible={setTriggerVisible}
                        createTriggerConfig={createTriggerConfig}
                        updateTriggerConfig={updateTriggerConfig}
                        pipelineId={pipeline && pipeline.id}
                        formValue={formValue}
                    />
                </div>
                <div className="trigger-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={triggerData}
                        rowKey={record=>record.timeId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无定时任务"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("triggerStore")(observer(Trigger))
