import React,{useState,Fragment} from "react";
import {Popconfirm,Tooltip} from "antd";
import {
    PlusOutlined,
    ExclamationCircleOutlined,
    TagsOutlined,
    ShareAltOutlined,
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import TaskIcon from "./TaskIcon";
import TaskAdd from "./TaskAdd";

const TaskGuiStage = props =>{

    const {setTaskFormDrawer,setCreacteValue,data,validType,setDataItem,pipeline,deleteTaskConfig} = props

    const pipelineType = pipeline && pipeline.type //流水线权限
    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉

    /**
     * 新建任务弹窗事件操作
     */
    const popUp = () =>{
        setTaskFormDrawer(false)
        setNewStageDrawer(true)
    }

    /**
     * 添加新任务
     */
    const newTask = () =>{
        setCreacteValue({
            stages:0,
            taskSort:data && data.length+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    /**
     * 多阶段 串行添加
     * @param list
     * @param groupIndex
     * @param stagesIndex
     */
    const serial = (list,groupIndex,stagesIndex) =>{
        setCreacteValue({
            stages:groupIndex+1,
            stagesId:list.stagesId,
            taskSort:stagesIndex,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    /**
     * 多阶段 并行添加
     * @param groupIndex
     */
     const parallelTask = (groupIndex) => {
        setCreacteValue({
            taskSort:0,
            stages:groupIndex+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    /**
     * 插入任务
     * @param group
     * @param groupIndex
     */
    const insertData = (group,groupIndex) => {
        setCreacteValue({
            taskSort:groupIndex+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
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
     * 修改模板和阶段name
     * @param group
     */
    const changName = group => {
        setDataItem(group)
        setTaskFormDrawer(true)
    }

    /**
     * 删除task
     * @param e
     * @param item
     */
    const deletePart = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        const params = {
            pipeline:{id:pipeline.id},
            configId:item.configId
        }
        deleteTaskConfig(params)
    }

    /**
     * task效验提示
     * @param configId
     * @returns {*}
     */
    const valid = configId => validType && validType.some(item=>item==configId)

    /**
     * 渲染多任务
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderSingleTask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            { group.type > 10 && renderFlowBtn(group,groupIndex) }
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className={`newStages-job`}>
                        {newJobContent(group,14)}
                    </div>
                    {/*{ renderCode(group) }*/}
                </div>
            </div>
        </Fragment>
    }


    /**
     * 多任务（添加任务）
     * 多阶段（添加阶段）
     * @param group
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const renderFlowBtn = (group,groupIndex) =>{
        return(
            <div className="group-flow">
                <div className={`group-flow_btn ${pipelineType===1?"group-flow_singleBtn":"group-flow_multiBtn"}`}>
                    <Tooltip title={pipelineType===1?"添加新任务":"添加新阶段"}>
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
     * 多任务||多阶段
     * 详情
     * @param item
     * @param deep
     * @returns {JSX.Element}
     */
    const newJobContent = (item,deep) =>{
        return(
            <div onClick={()=>showDetail(item)}
                 style={{paddingLeft:deep}}
                 className={`newStages-job-content ${valid(item.configId)?"job-name":""} ${item.type<10?"newStages-job-code":""}`}
            >
                <div className="newStages-job-sub">
                    <span className="newStages-job-icon"><TaskIcon type={item.type}/></span>
                    <span className="newStages-job-title">{item.name}</span>
                </div>
                {
                    valid(item.configId) &&
                    <div className="newStages-job-warn"><ExclamationCircleOutlined /></div>
                }
                <Popconfirm
                    title="你确定删除吗"
                    onConfirm={e=>deletePart(e,item)}
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
                        group && group.stagesList && group.stagesList.map((list,listIndex)=>{
                            return(
                               <div key={listIndex}
                                className={`${!group.code?"multi-content":""}`}>
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
                                                           {/*{ renderCode(stage) }*/}
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
                    { !group.code && parallel(groupIndex) }
                </div>
            </div>
        </Fragment>
    }

    /**
     * 多阶段 -- 并行任务添加按钮
     * @param groupIndex
     * @returns {JSX.Element}
     */
    const parallel = (groupIndex) =>{
        return <div className="multi-content add-newStages-contents">
            <div className="newStages-content" style={{paddingLeft:30}}>
                <div className="newStages-job">
                    <div className="add-newStages-job-content" onClick={()=>parallelTask(groupIndex)}>
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
                    <div className="group-name">{group && group.name}</div>
                    <div className="group-inputBtn" onClick={()=>changName(group)}>
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
                    {list.name?list.name:"源码"}
                    <span className="newStages-title-icon">
                        <EditOutlined onClick={()=>changName(list)}/>
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
                data && data.map((group,groupIndex) =>{
                    return  pipeline && pipeline.type===1 ? renderSingleTask(group,groupIndex): renderMultitask(group,groupIndex)
                })
            }
           {
                data && data.length > 0 ?
                <>
                    <div className="group-flow">
                        <div className={`group-flow_btn ${pipelineType===1?"group-flow_singleBtn":"group-flow_multiBtn"}`} />
                    </div>
                    <div className="group-create">
                        <div className="group-head">
                            <div className="name" style={{opacity:0}}/>
                        </div>
                        <div className="newStages-multi">
                            <div className="newStages-contents add-newStage">
                                <div className="newStages-content">
                                    <div className="newStages-job">
                                        <div onClick={()=>newTask()} className="newStages-job-content">
                                            <PlusOutlined/>
                                            <span style={{paddingLeft:5}}>{pipelineType===1?"新任务":"新阶段"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="group-create">
                    <div className="group-head">
                        <div className="name" style={{opacity:0}}/>
                    </div>
                    <div className="newStages-multi">
                        <div className="newStages-job">
                            <div onClick={()=>newTask()} className="newStages-job-content">
                                <PlusOutlined/>
                                <span style={{paddingLeft:5}}>{pipelineType===1?"新任务":"新阶段"}</span>
                            </div>
                        </div>
                    </div>
                </div>
           }
            <TaskAdd newStageDrawer={newStageDrawer} setNewStageDrawer={setNewStageDrawer}/>
        </div>
    )
}

export default TaskGuiStage
