import React,{Fragment,useEffect} from "react";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import TaskIcon from "./TaskIcon";
import {Popconfirm, Tooltip} from "antd";
import {FinalTaskAdd} from "./Common";

const Task = props => {

    const {pipeline,taskStore,addTask,setTaskFormDrawer,setCreateValue} = props

    const {findAllTask,taskList,taskFresh,setDataItem,deleteTask} = taskStore

    useEffect(()=>{
        if(pipeline){
            // 初始化多任务
            findAllTask(pipeline.id)
        }
    },[pipeline,taskFresh])

    /**
     * 添加新任务
     */
    const newTask = () =>{
        setCreateValue({
            taskSort:taskList && taskList.length>0?taskList.length:1,
        })
        addTask()
    }

    /**
     * 新任务
     * @param group
     * @param groupIndex
     */
    const insertData = (group,groupIndex) => {
        setCreateValue({
            taskSort:groupIndex+1,
        })
        addTask()
    }

    /**
     * 多阶段详情
     * @param item
     */
    const showDetail = item => {
        setDataItem(item)
        setTaskFormDrawer(true)
    }

    /**
     * 删除多阶段
     * @param e
     * @param item
     */
    const delTask = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteTask(item.taskId)
    }

    /**
     * 渲染多任务
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderSingleTask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            { group.taskType > 10 && renderFlowBtn(group,groupIndex) }
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className={`newStages-job`}>
                        {newJobContent(group,14)}
                    </div>
                </div>
            </div>
        </Fragment>
    }

    /**
     * 多任务（添加任务）
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderFlowBtn = (group,groupIndex) =>{
        return(
            <div className="group-flow">
                <div className={`group-flow_btn group-flow_singleBtn"}`}>
                    <Tooltip title="添加新任务">
                        <svg className="icon group-flow_btn_i"
                             aria-hidden="true"
                             onClick={()=>insertData(group,groupIndex)}
                        >
                            <use xlinkHref="#icon-zengjia"/>
                        </svg>
                    </Tooltip>
                </div>
            </div>
        )
    }


    const newJobContent = (item,deep) =>{
        return(
            <div onClick={()=>showDetail(item)}
                   // ${valid(item.taskId)?"job-name":""}
                 style={{paddingLeft:deep}}
                 className={`newStages-job-content ${item.taskType<10?"newStages-job-code":""}`}
            >
                <div className="newStages-job-sub">
                    <span className="newStages-job-icon"><TaskIcon type={item.taskType}/></span>
                    <span className="newStages-job-title">{item.taskName}</span>
                </div>
                {/*{*/}
                {/*    valid(item.taskId) &&*/}
                {/*    <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>*/}
                {/*}*/}
                <Popconfirm
                    title="你确定删除吗"
                    onConfirm={e=>delTask(e,item)}
                    onCancel={e=>e.stopPropagation()}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="newStages-job-del" onClick={e=>e.stopPropagation()}>
                        <DeleteOutlined />
                    </div>
                </Popconfirm>
            </div>
        )
    }

    return (
        <div className='guiView-main_group'>
            {
                taskList && taskList.map((group,groupIndex)=>renderSingleTask(group,groupIndex))
            }
            { FinalTaskAdd("singleBtn",taskList,"新任务",newTask) }

        </div>
    )
}


export default inject("taskStore")(observer(Task))
