import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Table} from "antd";
import EmptyText from "../../../common/emptyText/emptyText";
import Btn from "../../../common/btn/btn";
import TriggerAdd from "../components/triggerAdd";
import "../components/trigger.scss";

// 触发器
const Trigger = props =>{
    
    const [triggerList,setTriggerList] = useState([])
    const [triggerVisible,setTriggerVisible] = useState(false)

    const columns = [
        {
            title: "执行时间",
            dataIndex: "pipelineName",
            key: "pipelineName",
            // width:"40%",
            // ellipsis:true
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            // width:"40%",
            // ellipsis:true
            render:(text,record)=>(
                <div>
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            )
        },
    ]

    return (
        <div className="trigger">
            <div className="trigger-content home-limited">
                <div className="trigger-headline">
                    <div className="headline-left">定时触发</div>
                    <div>
                        <Btn
                            type={"link"}
                            icon={<PlusOutlined/>}
                            onClick={()=>setTriggerVisible(true)}
                            title={"添加"}
                        />
                        <TriggerAdd
                            triggerVisible={triggerVisible}
                            setTriggerVisible={setTriggerVisible}
                        />
                    </div>
                </div>
                <Table
                    bordered={false}
                    columns={columns}
                    dataSource={triggerList}
                    rowKey={record=>record}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default Trigger