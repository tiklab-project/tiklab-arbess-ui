import React,{useState,useEffect} from "react";
import {Table,Row,Col} from "antd";
import {PlusOutlined} from "@ant-design/icons";
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

    useEffect(()=>{
        // // 初始化触发器
        // findTrigger()
    },[])

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
            width:"60%",
            ellipsis:true,
        },
        {
            title: "执行方式",
            dataIndex: "taskType",
            key: "taskType",
            width:"30%",
            ellipsis:true,
            render:text => text===1?"单次触发":"周期触发"
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
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
            <Col md={{ span: 24 }} lg={{ span: "18", offset: "3" }}>
                <div className="trigger">
                    <div className="trigger-content">
                        <div className="trigger-up">
                            {/*<div className="trigger-up-title">定时触发</div>*/}
                            <div className="trigger-up-num">共{triggerData && triggerData.length?triggerData.length:0}个定时任务</div>
                            <Btn
                                title={"添加"}
                                icon={<PlusOutlined/>}
                                onClick={()=>addTrigger()}
                            />
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
                                locale={{emptyText: <ListEmpty title={"暂无定时任务"}/>}}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default inject("triggerStore")(observer(Trigger))
