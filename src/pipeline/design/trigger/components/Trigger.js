import React,{useState,useEffect} from "react";
import {Table, Row, Col, Tag} from "antd";
import {inject,observer} from "mobx-react";
import TriggerAddEdit from "./TriggerAddEdit";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import "./Trigger.scss";

/**
 * 触发器页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Trigger = props =>{

    const {triggerStore,match:{params}} = props

    const {updateTrigger,deleteTrigger,createTrigger,findAllTrigger,triggerData} = triggerStore

    const [formValue,setFormValue] = useState(null)
    const [triggerVisible,setTriggerVisible] = useState(false)

    const findTrigger = () =>{
        findAllTrigger(params.id)
    }

    /**
     * 添加触发器
     */
    const addTrigger = () => {
        setFormValue(null)
        setTriggerVisible(true)
    }

    /**
     * 编辑触发器
     * @param record
     */
    const editTrigger = record => {
        setFormValue(record)
        setTriggerVisible(true)
    }

    /**
     * 删除触发器
     * @param record
     */
    const delTrigger = record => {
        deleteTrigger(record.triggerId).then(res=>{
            if(res.code===0){
                findTrigger()
            }
        })
    }

    const columns = [
        {
            title: "执行时间",
            dataIndex: "execTime",
            key: "execTime",
            width:"50%",
            ellipsis:true,
        },
        {
            title: "执行方式",
            dataIndex: "taskType",
            key: "taskType",
            width:"25%",
            ellipsis:true,
            render:text => text===1?"单次触发":"周期触发"
        },
        {
            title: "触发状态",
            dataIndex: "state",
            key: "state",
            width:"15%",
            ellipsis:true,
            render:text => text==="1" ?
                <Tag color="green">未触发</Tag>
                :
                <Tag color="red">已触发</Tag>
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(_,record) =>(
                <ListAction
                    edit={()=>editTrigger(record)}
                    del={()=>delTrigger(record)}
                />
            )
        },
    ]

    return (
        <Row className="design-content">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
                className="trigger"
            >
                <div className="trigger-up">
                    <div className="trigger-up-num">共{triggerData && triggerData.length?triggerData.length:0}条</div>
                    <Btn title={"添加"} onClick={addTrigger}/>
                    <TriggerAddEdit
                        triggerVisible={triggerVisible}
                        setTriggerVisible={setTriggerVisible}
                        createTrigger={createTrigger}
                        updateTrigger={updateTrigger}
                        findTrigger={findTrigger}
                        pipelineId={params.id}
                        formValue={formValue}
                    />
                </div>
                <div className="trigger-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={triggerData}
                        rowKey={record=>record.triggerId}
                        pagination={false}
                        locale={{emptyText: <ListEmpty />}}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default inject("triggerStore")(observer(Trigger))
