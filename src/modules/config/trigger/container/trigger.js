import React,{useState,useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Space,Table} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";
import Btn from "../../../common/btn/btn";
import TriggerAdd from "../components/triggerAdd";
import TriggerTimeAdd from "../components/triggerTimeAdd";
import Listaction from "../../../common/list/listaction";
import "../components/trigger.scss";

// 触发器
const Trigger = props =>{
    
    const {triggerStore,pipelineStore} = props

    const {updateBeforeConfig,deleteBeforeConfig,createBeforeConfig,findAllBeforeConfig,oneAllBeforeConfig,triggerData,
        isFindTrigger
    } = triggerStore
    const {pipelineId} = pipelineStore

    const [triggerVisible,setTriggerVisible] = useState(false)
    const [triggerTimeVisible,setTriggerTimeVisible] = useState(false)
    const [formValue,setFormValue] = useState("")
    const [dataItem,setDataItem] = useState("")

    useEffect(()=>{
        findAllBeforeConfig(pipelineId)
    },[isFindTrigger,pipelineId])
    
    const addTriggerTime = item => {
        setDataItem(item)
        setFormValue("")
        setTriggerTimeVisible(true)
    }
    
    const edit = (text,record) => {
        setFormValue(record)
        setDataItem(record)
        setTriggerTimeVisible(true)
    }

    const del = (text,record) => {

    }

    const renderData = text => {
        switch (text) {
            case 1:
                return "全部"
            case 2:
                return "星期一"
            case 3:
                return "星期二"
            case 4:
                return "星期三"
            case 5:
                return "星期四"
            case 6:
                return "星期五"
            case 7:
                return "星期六"
            case 8:
                return "星期天"
        }
    }
    
    const columns = [
        {
            title: "执行时间",
            dataIndex: "date",
            key: "date",
            // width:"40%",
            // ellipsis:true
            render:(text,record)=>{
                return(
                    <Space>
                        {renderData(text)}
                        {record.time}
                    </Space>
                )
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

    const renderTitle = item =>{
        switch (item.type) {
            case 81:
                return "定时触发"
        }
    }

    return (
        <div className="trigger">
            {/* <div className="trigger-add">
                <Btn
                    icon={<PlusOutlined/>}
                    onClick={()=>setTriggerVisible(true)}
                    title={"添加"}
                />
                <TriggerAdd
                    triggerVisible={triggerVisible}
                    setTriggerVisible={setTriggerVisible}
                    createBeforeConfig={createBeforeConfig}
                    pipelineId={pipelineId}
                />
            </div> */}
            <div className="trigger-content home-limited">
                <div className="trigger-tables">
                    {
                        triggerData && triggerData.map(item=>{
                            return  <div className="trigger-headline" key={item.configId}>
                                        <div className="headline-left">{renderTitle(item)}</div>
                                        <Btn
                                            type={"link"}
                                            icon={<PlusOutlined/>}
                                            onClick={()=>addTriggerTime(item)}
                                            title={"添加"}
                                        />
                                    </div>
                        })
                    }
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={triggerData}
                        rowKey={record=>record}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                    <TriggerTimeAdd
                        triggerTimeVisible={triggerTimeVisible}
                        setTriggerTimeVisible={setTriggerTimeVisible}
                        updateBeforeConfig={updateBeforeConfig}
                        pipelineId={pipelineId}
                        dataItem={dataItem}
                        formValue={formValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("triggerStore","pipelineStore")(observer(Trigger))