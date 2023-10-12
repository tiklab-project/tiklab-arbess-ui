import React, {useState} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../../common/component/btn/Btn";
import PipelineDrawer from "../../../../../common/component/drawer/Drawer";
import BasicInfo from "../basicInfo/BasicInfo";
import {HeadlineTitle} from "./TaskTitleIcon";
import Tabs from "../../../../../common/component/tabs/Tabs";
import Condition from "../condition/Condition";
import Postprocess from "../postprocess/Postprocess";
import Variable from "../variable/Variable";
import "./TaskDetails.scss";

/**
 * 任务详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskDetails = props =>{

    const {taskFormDrawer,setTaskFormDrawer,taskStore} = props

    const {dataItem} = taskStore

    // 标签类型
    const [handleType,setHandleType] = useState("base")

    const lis = [
        {id:"base", title: "基本信息"},
        {id:"var", title:"变量"},
        {id:"cond", title:"条件"},
        {id:"pose", title:"后置处理"}
    ]

    /**
     * task类型
     * @param item
     */
    const changHandleType = item =>{
        setHandleType(item.id)
    }

    /**
     * 关闭弹出框
     */
    const onClose = () =>{
        setHandleType("base")
        setTaskFormDrawer(false)
    }

    return(
        <PipelineDrawer
            visible={taskFormDrawer}
            onClose={onClose}
            width={520}
            mask={true}
            className="mf task-details"
        >
            <div className="task-details-up">
                <div className="wrapper-head-title">{HeadlineTitle(dataItem?.taskType)}</div>
                <Btn onClick={onClose} title={<CloseOutlined />} type="text"/>
            </div>
            <div className="task-details-bottom">
                <div className="body">
                    <div className="body-taskForm">
                        <BasicInfo
                            {...props}
                        />
                        {/*<Tabs*/}
                        {/*    tabLis={dataItem?.formType==='task' ? lis: [{id:"base", title: "基本信息"}]}*/}
                        {/*    type={handleType}*/}
                        {/*    onClick={changHandleType}*/}
                        {/*/>*/}
                        {/*{*/}
                        {/*    handleType==="base" &&*/}
                        {/*    <BasicInfo*/}
                        {/*        {...props}*/}
                        {/*    />*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    handleType==="var" &&*/}
                        {/*    <Variable*/}
                        {/*        dataItem={dataItem}*/}
                        {/*    />*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    handleType==="cond" &&*/}
                        {/*    <Condition dataItem={dataItem}/>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    handleType==="pose" &&*/}
                        {/*    <Postprocess*/}
                        {/*        dataItem={dataItem}*/}
                        {/*    />*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        </PipelineDrawer>
    )
}

export default inject("taskStore","stageStore")(observer(TaskDetails))

