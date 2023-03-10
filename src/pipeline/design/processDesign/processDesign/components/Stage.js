import React,{useState,useEffect,Fragment} from "react";
import {Tooltip} from "antd";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import {TaskFinalAdd, TaskTypeContent, TaskInsertBtn} from "./Common";
import {SpinLoading} from "../../../../../common/loading/Loading";

/**
 * 多阶段
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Stage = props =>{

    const {stageStore,taskStore,pipeline,addTask,setCreateValue,setTaskFormDrawer} = props

    const {stageList,finAllStage,stageFresh,deleteStage,validStagesMustField,stageMustField} = stageStore
    const {setDataItem,taskFresh} = taskStore

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 初始化多阶段
        finAllStage(pipeline.id).then(()=>{
            setIsLoading(false)
        })

        // 获取未填的必需任务
        validStagesMustField(pipeline.id)

    },[stageFresh,taskFresh])

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
        setTaskFormDrawer(false)
    }

    /**
     * task效验提示
     * @param taskId
     * @returns {*}
     */
    // const valid = taskId => validType && validType.some(item=>item==taskId)
    const valid = taskId => false

    /**
     * 渲染多阶段
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderMultitask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            { !group.code && TaskInsertBtn(insertData,group,groupIndex,"multiBtn") }
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
                                               list && list.taskValues && list.taskValues.map((task,taskIndex)=>{
                                                   return (
                                                       <div key={taskIndex}>
                                                           <div className={`newStages-job ${!group.code?"newStages-has":""}`} >
                                                               { !group.code && hasAddPre(list,groupIndex,taskIndex) }
                                                               { TaskTypeContent(task,20,showDetail,deleteTask,stageMustField) }
                                                               { !group.code && hasAddNext(list,groupIndex,taskIndex) }
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
     * 并行任务添加按钮
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
     * 渲染任务阶段name
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

    if(isLoading){
        return <SpinLoading size="large"/>
    }


    return(
        <div className="guiView-main_group">
            {
                stageList && stageList.map((group,groupIndex) => renderMultitask(group,groupIndex))
            }
            {
                TaskFinalAdd("multiBtn",stageList,"新阶段",newTask)
            }
        </div>
    )
}

export default inject("stageStore","taskStore")(observer(Stage))
