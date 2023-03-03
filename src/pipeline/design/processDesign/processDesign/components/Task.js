import React,{Fragment,useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {TaskFinalAdd,TaskTypeContent,TaskInsertBtn} from "./Common";
import {SpinLoading} from "../../../../../common/loading/Loading";

const Task = props => {

    const {pipeline,taskStore,addTask,setTaskFormDrawer,setCreateValue} = props

    const {findAllTask,taskList,taskFresh,setDataItem,deleteTask} = taskStore

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(pipeline){
            // 初始化多任务
            findAllTask(pipeline.id).then(()=>{
                setIsLoading(false)
            })
        }
    },[pipeline,taskFresh])

    /**
     * 添加新任务
     */
    const newTask = () =>{
        setCreateValue({
            taskSort:taskList && taskList.length>0?taskList.length+1:1,
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
        setTaskFormDrawer(false)
    }

    /**
     * 渲染多任务
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderSingleTask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            { group.taskType > 10 && TaskInsertBtn(insertData,group,groupIndex,"singleBtn") }
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className={`newStages-job`}>
                        {TaskTypeContent(group,14,showDetail,delTask)}
                    </div>
                </div>
            </div>
        </Fragment>
    }

    if(isLoading){
        return <SpinLoading size="large"/>
    }

    return (
        <div className='guiView-main_group'>
            {
                taskList && taskList.map((group,groupIndex)=>renderSingleTask(group,groupIndex))
            }
            {
                TaskFinalAdd("singleBtn",taskList,"新任务",newTask)
            }
        </div>
    )
}


export default inject("taskStore")(observer(Task))
