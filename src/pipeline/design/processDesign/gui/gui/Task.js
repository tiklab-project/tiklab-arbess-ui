import React,{Fragment,useEffect,useState} from "react";
import {Popconfirm} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {TaskFinalAdd,TaskInsertBtn} from "./Common";
import {SpinLoading} from "../../../../../common/component/loading/Loading";
import {TaskIcon} from "./TaskTitleIcon";

/**
 * 多任务
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Task = props => {

    const {pipeline,taskStore,addTask,setTaskFormDrawer,setCreateValue} = props

    const {findAllTask,taskList,taskFresh,setDataItem,deleteTask,validTaskMustField,taskMustField} = taskStore

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 获取多任务
        findAllTask(pipeline.id).then(()=>{
            setIsLoading(false)
        })
        // 获取未填的必需任务
        validTaskMustField(pipeline.id)
    },[taskFresh])

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
     */
    const showDetail = item => {
        setDataItem({
            ...item,
            formType:'task',
        })
        setTaskFormDrawer(true)
    }

    /**
     * 删除多阶段
     */
    const delTask = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteTask({
            taskName:item.taskName,
            pipelineId:pipeline.id
        })
    }

    const isBtn = type =>{
        return !(type === 'git' || type === 'gitee' || type === 'github' || type === 'gitlab' || type === 'svn' || type === 'xcode');
    }

    /**
     * 渲染多任务
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderSingleTask = (group,groupIndex) =>{
        const valid = taskName => taskMustField && taskMustField.some(li=>li===taskName)

        return <Fragment key={groupIndex}>
            { isBtn(group.taskType) && TaskInsertBtn(insertData,group,groupIndex,"singleBtn") }
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className="newStages-job">
                        <div onClick={()=>showDetail(group)}
                             style={{paddingLeft:14}}
                             className={`newStages-job-content ${valid(group.taskName)?"job-name":""}`}
                        >
                            <div className="newStages-job-sub">
                                <span className="newStages-job-icon"><TaskIcon type={group.taskType}/></span>
                                <span className="newStages-job-title">{group.taskName}</span>
                            </div>
                            {
                                valid(group.taskName) &&
                                <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>
                            }
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={e=>delTask(e,group)}
                                onCancel={e=>e.stopPropagation()}
                                okText="确定"
                                cancelText="取消"
                            >
                                <div className="newStages-job-del" onClick={e=>e.stopPropagation()}>
                                    <DeleteOutlined />
                                </div>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    }

    if(isLoading){
        return <SpinLoading size="large" title="加载中……"/>
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
