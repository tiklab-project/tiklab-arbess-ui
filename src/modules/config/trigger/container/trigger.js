import React,{useState,useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Space,Table} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";
import Btn from "../../../common/btn/btn";
import TriggerTimeAdd from "../components/triggerTimeAdd";
import Listaction from "../../../common/list/listaction";
import "../components/trigger.scss";
import HlineIcon from "../../common/components/hlineIcon";

// 触发器
const Trigger = props =>{
    
    const {triggerStore,pipelineStore} = props

    const {updateTriggerConfig,deleteTriggerConfig,createTriggerConfig,findAllTriggerConfig,oneAllTriggerConfig,triggerData,
        isFindTrigger
    } = triggerStore
    const {pipelineId} = pipelineStore

    const [triggerTimeVisible,setTriggerTimeVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        findAllTriggerConfig(pipelineId)
    },[isFindTrigger,pipelineId])
    
    const addTriggerTime = item => {
        setFormValue("")
        setTriggerTimeVisible(true)
    }
    
    const edit = (text,record) => {
        setFormValue(record)
        setTriggerTimeVisible(true)
    }

    const del = (text,record) => {
        deleteTriggerConfig(record.configId)
    }
    
    const columns = [
        {
            title: "执行时间",
            dataIndex: "execTime",
            key: "execTime",
            // width:"40%",
            // ellipsis:true
        },
        {
            title: "执行方式",
            dataIndex: "taskType",
            key: "taskType",
            // width:"40%",
            // ellipsis:true
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
            // width:"40%",
            // ellipsis:true
            render:(text,record) => {
                return  <Listaction
                    edit={()=>edit(text,record)}
                    del={()=>del(text,record)}
                />
            }
        },
    ]

    return (
        <div className="trigger">
            <div className="trigger-content home-limited">
                <div className="trigger-tables">
                    <div className="trigger-headline">
                        <div className="headline-left">
                            <HlineIcon type={81}/>
                        </div>
                        <Btn
                            type={"link"}
                            icon={<PlusOutlined/>}
                            onClick={()=>addTriggerTime()}
                            title={"添加"}
                        />
                    </div>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={triggerData}
                        rowKey={record=>record.timeId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"没有查询到定时任务"}/>}}
                    />
                    <TriggerTimeAdd
                        triggerTimeVisible={triggerTimeVisible}
                        setTriggerTimeVisible={setTriggerTimeVisible}
                        createTriggerConfig={createTriggerConfig}
                        updateTriggerConfig={updateTriggerConfig}
                        pipelineId={pipelineId}
                        formValue={formValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("triggerStore","pipelineStore")(observer(Trigger))