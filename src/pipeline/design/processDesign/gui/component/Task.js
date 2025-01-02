import React,{Fragment,useEffect,useState} from "react";
import {Popconfirm, Tooltip} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {SpinLoading} from "../../../../../common/component/loading/Loading";
import pip_zengjia from "../../../../../assets/images/svg/pip_zengjia.svg";
import {TaskIcon} from "./TaskTitleIcon";
import {TaskFinalAdd} from "./Common";

/**
 * 多任务
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Task = props => {

    const {taskStore,addTask,setTaskFormDrawer,setCreateValue,match:{params}} = props

    const {findAllTask,taskFresh,setDataItem,deleteTask,taskMustField} = taskStore

    //加载状态
    const [isLoading,setIsLoading] = useState(true)
    //多任务列表
    const [taskList,setTaskList] = useState([])

    useEffect(()=>{
        // 获取多任务
        findAllTask(params.id).then(res=>{
            if(res.code===0){
                setTaskList(res.data || [])
            }
        }).finally(()=>setIsLoading(false))
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
            taskId:item.taskId,
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
        deleteTask(item.taskId)
        setTaskFormDrawer(false)
    }

    /**
     * false：源码；true：不是源码
     * @param type
     * @returns {boolean}
     */
    const isCode = type =>{
        return !(type === 'git' || type === 'gitee' || type === 'github' || type === 'gitlab' || type === 'svn' || type === 'gitpuk');
    }

    /**
     * 渲染多任务
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderSingleTask = (group,groupIndex) =>{
        const valid = () => taskMustField && taskMustField.some(li=>li===group.taskId)

        return <Fragment key={groupIndex}>
            {
                isCode(group.taskType) &&
                <div className="group-flow">
                    <div className="group-flow_btn group-flow_singleBtn">
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
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className="newStages-job">
                        <div onClick={()=>showDetail(group)}
                             style={{paddingLeft:14}}
                             className={`newStages-job-content ${valid()?"job-name":""}`}
                        >
                            <div className="newStages-job-sub" title={group.taskName}>
                                <span className="newStages-job-icon"><TaskIcon type={group.taskType}/></span>
                                <span className="newStages-job-title">{group.taskName}</span>
                            </div>
                            {
                                valid() &&
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
