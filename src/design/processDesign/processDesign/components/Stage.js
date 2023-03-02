import React,{useState,useEffect,Fragment} from "react";
import {Popconfirm,Tooltip} from "antd";
import {
    PlusOutlined,
    ExclamationCircleOutlined,
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import TaskIcon from "./TaskIcon";
import {FinalTaskAdd} from "./Common";

const Stage = props =>{

    const {stageStore,taskStore,pipeline,addTask,setCreateValue,setTaskFormDrawer} = props

    const {stageList,finAllStage,stageFresh,deleteStage} = stageStore
    const {setDataItem} = taskStore

    useEffect(()=>{
        if(pipeline){
            // 初始化多阶段
            finAllStage(pipeline.id)
        }
    },[pipeline,stageFresh])

    /**
     * 添加新任务
     */
    const newTask = () =>{
        setCreateValue({
            stageSort:stageList && stageList.length>0?stageList.length:1,
        })
        addTask()
    }

    /**
     * 多阶段 串行添加
     * @param list
     * @param groupIndex
     * @param stagesIndex
     */
    const serial = (list,groupIndex,stagesIndex) =>{
        setCreateValue({
            stageSort:groupIndex+1,
            stageId:list.stageId,
            taskSort:stagesIndex,
        })
        addTask()
    }

    /**
     * 多阶段 并行添加
     * @param group
     */
     const parallelTask = group => {
         setCreateValue({
             stageId:group.stageId
         })
        addTask()
    }

    /**
     * 插入任务
     * @param group
     * @param groupIndex
     */
    const insertData = (group,groupIndex) => {
        setCreateValue({
            stageSort:groupIndex+1,
        })
        addTask()
    }

    /**
     * task详情
     * @param item
     */
    const showDetail = item =>{
        setDataItem(item)
        setTaskFormDrawer(true)
    }

    /**
     * 删除多阶段
     * @param e
     * @param item
     */
    const deleteTask = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteStage(item.taskId)
    }

    /**
     * task效验提示
     * @param taskId
     * @returns {*}
     */
    // const valid = taskId => validType && validType.some(item=>item==taskId)
    const valid = taskId => false

    /**
     * 多阶段（添加阶段）
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderFlowBtn = (group,groupIndex) =>{
        return(
            <div className="group-flow">
                <div className={`group-flow_btn group-flow_multiBtn`}>
                    <Tooltip title={"添加新阶段"}>
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

    /**
     * 多阶段详情
     * @param item
     * @param deep
     * @returns {JSX.Element}
     */
    const newJobContent = (item,deep) =>{
        return(
            <div onClick={()=>showDetail(item)}
                 style={{paddingLeft:deep}}
                 className={`newStages-job-content ${valid(item.taskId)?"job-name":""} ${item.taskType<10?"newStages-job-code":""}`}
            >
                <div className="newStages-job-sub">
                    <span className="newStages-job-icon"><TaskIcon type={item.taskType}/></span>
                    <span className="newStages-job-title">{item.taskName}</span>
                </div>
                {
                    valid(item.taskId) &&
                    <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>
                }
                <Popconfirm
                    title="你确定删除吗"
                    onConfirm={e=>deleteTask(e,item)}
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

    /**
     * 渲染多阶段
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderMultitask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            { !group.code && renderFlowBtn(group,groupIndex) }
            <div className="group-table">
                { groupHead(group) }
                <div className="newStages-multi">
                    {
                        group && group.stageList && group.stageList.map((list,listIndex)=>{
                            return(
                               <div key={listIndex} className={`${!group.code?"multi-content":""}`}>
                                   { listHead(group,list) }
                                   <div className={`newStages-contents ${group.code?"newStages-code":""}`}>
                                       <div className="newStages-content">
                                           {
                                               list && list.taskValues && list.taskValues.map((stage,stagesIndex)=>{
                                                   return (
                                                       <div key={stagesIndex}>
                                                           <div className={`newStages-job ${!group.code?"newStages-has":""}`} >
                                                               { !group.code && hasAddPre(list,groupIndex,stagesIndex) }
                                                               { newJobContent(stage,20) }
                                                               { !group.code && hasAddNext(list,groupIndex,stagesIndex) }
                                                           </div>
                                                       </div>
                                                   )
                                               })
                                           }
                                       </div>
                                   </div>
                               </div>
                            )
                        })
                    }
                    { !group.code && parallel(group) }
                </div>
            </div>
        </Fragment>
    }

    /**
     * 多阶段 -- 并行任务添加按钮
     * @param group
     * @returns {JSX.Element}
     */
    const parallel = group =>{
        return <div className="multi-content add-newStages-contents">
            <div className="newStages-content" style={{paddingLeft:30}}>
                <div className="newStages-job">
                    <div className="add-newStages-job-content" onClick={()=>parallelTask(group)}>
                        <PlusOutlined/>
                        <span style={{paddingLeft:5}}>并行阶段</span>
                    </div>
                </div>
            </div>
        </div>
    }

    /**
     * 多阶段
     * 渲染每个模板阶段name
     * @param group
     * @returns {JSX.Element}
     */
    const groupHead = group =>{
        return(
            <div className="group-head">
                <div className="name">
                    <div className="group-name">{group && group.stageName}</div>
                    <div className="group-inputBtn" onClick={()=>showDetail(group)}>
                        <EditOutlined/>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 多阶段
     * 渲染模板下阶段name
     * @param group
     * @param list
     * @returns {JSX.Element}
     */
    const listHead = (group,list) =>{
        return(
            <div className="newStages-title" style={group.code?{opacity:0}:null}>
                <span className="newStages-title-name">
                    {list.stageName?list.stageName:"阶段"}
                    <span className="newStages-title-icon">
                        <EditOutlined onClick={()=>showDetail(list)}/>
                    </span>
                </span>
            </div>
        )
    }

    /**
     * 多阶段
     * 渲染串行任务（上）
     * @param list
     * @param groupIndex
     * @param stagesIndex
     * @returns {JSX.Element}
     */
    const hasAddPre = (list,groupIndex,stagesIndex) =>{
        return(
            <Tooltip title={"串行任务"}>
                <div className="newStages-has-add"
                     style={{marginRight:15}}
                     onClick={()=>serial(list,groupIndex,stagesIndex+1)}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </Tooltip>
        )
    }

    /**
     * 多阶段
     * 渲染串行任务（下）
     * @param list
     * @param groupIndex
     * @param stagesIndex
     * @returns {JSX.Element}
     */
    const hasAddNext = (list,groupIndex,stagesIndex) =>{
        return(
            <Tooltip title={"串行任务"}>
                <div className="newStages-has-add"
                     style={{marginLeft:15}}
                     onClick={()=>serial(list,groupIndex,stagesIndex+2)}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </Tooltip>
        )
    }

    return(
        <div className="guiView-main_group">
            {
                stageList && stageList.map((group,groupIndex) => renderMultitask(group,groupIndex))
            }
            {
                FinalTaskAdd("multiBtn",stageList,"新阶段",newTask)
            }

        </div>
    )
}

export default inject("stageStore","taskStore")(observer(Stage))
