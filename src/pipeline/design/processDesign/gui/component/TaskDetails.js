/**
 * @Description: 任务详情
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React, {useEffect,useState} from "react";
import {Skeleton} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Button from "../../../../../common/component/button/Button";
import PipelineDrawer from "../../../../../common/component/drawer/Drawer";
import BasicInfo from "./basicInfo/BasicInfo";
import {HeadlineTitle} from "./TaskCommon";
import "./TaskDetails.scss";

const TaskDetails = props =>{

    const {taskFormDrawer,setTaskFormDrawer,taskStore} = props

    const {dataItem,findOneTasksOrTask} = taskStore;

    //加载状态
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(taskFormDrawer && dataItem?.formType==="task"){
            setLoading(true)
            findOneTasksOrTask(dataItem.taskId).then(()=>{
            }).finally(()=>setLoading(false))
        }
    }, [taskFormDrawer]);

    /**
     * 关闭弹出框
     */
    const onClose = () =>{
        setTaskFormDrawer(false)
    }

    return(
        <PipelineDrawer
            visible={taskFormDrawer}
            onClose={onClose}
            width={520}
            mask={true}
            className="task-details"
        >
            <div className="task-details-up">
                <div className="wrapper-head-title">{HeadlineTitle(dataItem?.taskType)}</div>
                <Button onClick={onClose} title={<CloseOutlined />} type="text"/>
            </div>
            <div className="task-details-bottom">
                <div className="body-taskForm">
                    <Skeleton loading={loading}>
                        <BasicInfo {...props}/>
                    </Skeleton>
                </div>
            </div>
        </PipelineDrawer>
    )
}

export default inject("taskStore","stageStore")(observer(TaskDetails))

