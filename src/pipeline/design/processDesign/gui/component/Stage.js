import React,{useState,useEffect,Fragment} from "react";
import {Popconfirm, Tooltip,Spin} from "antd";
import {PlusOutlined, EditOutlined, ExclamationCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import pip_zengjia from "../../../../../assets/images/svg/pip_zengjia.svg";
import {TaskIcon} from "./TaskTitleIcon";
import {TaskFinalAdd} from "./Common";

/**
 * 多阶段
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Stage = props =>{

    const {stageStore,taskStore,addTask,setCreateValue,setTaskFormDrawer,match:{params}} = props

    const {finAllStage,stageFresh,deleteStage,stageMustField} = stageStore
    const {setDataItem,taskFresh} = taskStore

    // 加载状态
    const [isLoading,setIsLoading] = useState(false);

    // 多阶段列表
    const [stageList,setStageList] = useState([])

    useEffect(()=>{
        // 获取多阶段
        findStage()
    },[stageFresh,taskFresh])

    /**
     * 获取多阶段
     */
    const findStage = () =>{
        setIsLoading(true)
        finAllStage(params.id).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                setStageList(res.data || [])
            }
        })
    }

    /**
     * 添加新任务
     */
    const newTask = () =>{
        setCreateValue({
            stageSort:stageList && stageList.length>0?stageList.length+1:1,
        })
        addTask()
    }

    /**
     * 多阶段 串行添加
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
     */
    const showDetail = (item,formType) =>{
        setDataItem({
            ...item,
            formType
        })
        setTaskFormDrawer(true)
    }

    /**
     * 删除多阶段
     */
    const deleteTask = (e,group,list,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteStage(item.taskId)
        setTaskFormDrawer(false)
    }

    /**
     * 渲染多阶段
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderMultitask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            {
                !group.code &&
                <div className="group-flow">
                    <div className="group-flow_btn group-flow_multiBtn">
                        <Tooltip title="添加新任务">
                            <img
                                src={pip_zengjia}
                                style={{width:22,height:22}}
                                className="group-flow_btn_i"
                                alt={"添加"}
                                onClick={()=>insertData(group,groupIndex)}
                            />
                        </Tooltip>
                    </div>
                </div>
            }
            <div className="group-table">
                <div className="group-head">
                    <div className="name">
                        <div className="group-name">{group?.stageName}</div>
                        <div className="group-inputBtn"
                             onClick={()=>showDetail(group,'stage')}
                        ><EditOutlined/></div>
                    </div>
                </div>
                <div className="newStages-multi">
                    {
                        group && group.stageList && group.stageList.map((list,listIndex)=>{
                            return(
                               <div key={listIndex} className={`${!group.code?"multi-content":""}`}>
                                   {/*<div className="newStages-title" style={group.code? {opacity:0}:null}>*/}
                                   {/*     <span className="newStages-title-name">*/}
                                   {/*         {list?.stageName || "阶段"}*/}
                                   {/*         <span className="newStages-title-icon">*/}
                                   {/*             <EditOutlined onClick={()=>showDetail(list,'parallel')}/>*/}
                                   {/*         </span>*/}
                                   {/*     </span>*/}
                                   {/*</div>*/}
                                   <div className={`newStages-contents ${group.code?"newStages-code":""}`}>
                                       <div className="newStages-content">
                                           {
                                               list && list.taskValues && list.taskValues.map((task,taskIndex)=>{
                                                   const valid = () => stageMustField && stageMustField.some(li=>li===task.taskId)
                                                   return (
                                                       <div key={taskIndex}>
                                                           <div className={`newStages-job ${!group.code?"newStages-has":""}`} >
                                                               { !group.code &&
                                                                   <Tooltip title={"串行任务"}>
                                                                       <div className="newStages-has-add"
                                                                            style={{marginRight:15}}
                                                                            onClick={()=>serial(list,groupIndex,taskIndex+1)}
                                                                       >
                                                                           <img
                                                                               src={pip_zengjia}
                                                                               style={{width:16,height:16}}
                                                                               alt={"添加"}
                                                                           />
                                                                       </div>
                                                                   </Tooltip>
                                                               }
                                                               <div style={{paddingLeft:20}}
                                                                    className={`newStages-job-content ${valid() ? "job-name":""}`}
                                                                    onClick={()=>showDetail(task,'task')}
                                                               >
                                                                   <div className="newStages-job-sub" title={task.taskName}>
                                                                       <span className="newStages-job-icon"><TaskIcon type={task.taskType}/></span>
                                                                       <span className="newStages-job-title">{task.taskName}</span>
                                                                   </div>
                                                                   {
                                                                       valid() &&
                                                                       <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>
                                                                   }
                                                                   <Popconfirm
                                                                       title="你确定删除吗"
                                                                       onConfirm={e=>deleteTask(e,group,list,task)}
                                                                       onCancel={e=>e.stopPropagation()}
                                                                       okText="确定"
                                                                       cancelText="取消"
                                                                   >
                                                                       <div className="newStages-job-del" onClick={e=>e.stopPropagation()}>
                                                                           <DeleteOutlined />
                                                                       </div>
                                                                   </Popconfirm>
                                                               </div>
                                                               { !group.code &&
                                                                   <Tooltip title={"串行任务"}>
                                                                       <div className="newStages-has-add"
                                                                            style={{marginLeft:15}}
                                                                            onClick={()=>serial(list,groupIndex,taskIndex+2)}
                                                                       >
                                                                           <img
                                                                               src={pip_zengjia}
                                                                               style={{width:16,height:16}}
                                                                               alt={"添加"}
                                                                           />
                                                                       </div>
                                                                   </Tooltip>
                                                               }
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
                    {
                        !group.code &&
                        <div className="multi-content add-newStages-contents">
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
                </div>
            </div>
        </Fragment>
    }

    return(
        <Spin spinning={isLoading}>
            <div className="guiView-main_group">
                {
                    stageList && stageList.map((group,groupIndex) => renderMultitask(group,groupIndex))
                }
                {
                    TaskFinalAdd("multiBtn",stageList,"新阶段",newTask)
                }
            </div>
        </Spin>
    )
}

export default inject("stageStore","taskStore")(observer(Stage))
