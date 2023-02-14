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
import SIcon from "../../common/components/sIcon";
import AddDrawer from "./addDrawer";

const NewStage = props =>{

    const {setTaskFormDrawer,setCreacteValue,data,validType,setDataItem,pipeline,deleteTaskConfig} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [hover,setHover] = useState(false) // 并行按钮悬浮样式显示

    const pipelineType = pipeline && pipeline.type

    // 新建任务弹窗事件操作
    const popUp = () =>{
        setTaskFormDrawer(false)
        setNewStageDrawer(true)
    }

    // +新任务
    const newTask = () =>{
        setCreacteValue({
            stages:0,
            taskSort:data && data.length+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    // 多阶段 串行
    const serial = (list,groupIndex,stagesIndex) =>{
        setCreacteValue({
            stages:groupIndex+1,
            stagesId:list.stagesId,
            taskSort:stagesIndex,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

     // 多阶段 并行
     const parallelTask = (groupIndex) => {
        setCreacteValue({
            taskSort:0,
            stages:groupIndex+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    // 插入任务
    const insertData = (group,groupIndex) => {
        setCreacteValue({
            taskSort:groupIndex+1,
            pipeline:{id:pipeline.id},
        })
        popUp()
    }

    // Form详情
    const showDetail = item =>{
        setDataItem(item)
        setTaskFormDrawer(true)
    }

    // 修改模板和阶段name
    const changName = group => {
        setDataItem(group)
        setTaskFormDrawer(true)
    }

    // 删除
    const deletePart = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        const params = {
            pipeline:{id:pipeline.id},
            configId:item.configId
        }
        deleteTaskConfig(params)
    }

    // 多任务||多阶段 -- 效验提示
    const valid = configId => validType && validType.some(item=>item==configId)

    // 多任务||多阶段 -- 源码地址和分支
    const renderCode = item =>{
        if(item.type<10){
            const codeBranch = item && item.codeBranch
            return item && item.codeName ?
                <>
                    <div className="newStages-codeName">
                        <div className="branch-title">
                            <TagsOutlined style={{paddingRight:5}}/>
                            {item.codeName}
                        </div>
                    </div>
                    <div className="newStages-branch ">
                        <div className="branch-address">
                            {
                                codeBranch==="" || !codeBranch ?
                                    <><ShareAltOutlined style={{paddingRight:5}}/>master</>
                                    :
                                    <><ShareAltOutlined style={{paddingRight:5}}/>{codeBranch}</>
                            }
                        </div>
                    </div>
                </> : null
        }
    }

    // 多任务（添加任务）；多阶段（添加阶段）
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

    // 多任务||多阶段 -- 详情
    const newJobContent = (item,deep) =>{
        return(
            <div onClick={()=>showDetail(item)}
                 style={{paddingLeft:deep}}
                 className={`newStages-job-content ${valid(item.configId)?"job-name":""} ${item.type<10?"newStages-job-code":""}`}
            >
                <div className="newStages-job-sub">
                    <span className="newStages-job-icon">
                        <SIcon type={item.type}/>
                    </span>
                    <span className="newStages-job-title">
                        {item.name}
                    </span>
                </div>
                {valid(item.configId) &&
                    <div className="newStages-job-warn">
                        <ExclamationCircleOutlined />
                    </div>
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

    // 多任务
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
                    { renderCode(group) }
                </div>
            </div>
        </Fragment>
    }

    // 多阶段 -- 并行任务添加按钮
    const parallel = (groupIndex) =>{
        return <div className={`multi-content add-newStages-contents ${hover?"add-hover":""}`}>
            <div className="newStages-content" style={{paddingLeft:30}}>
                <div className="newStages-job">
                    <div
                        className="add-newStages-job-content"
                        onClick={()=>parallelTask(groupIndex)}
                        onMouseOver={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}
                    >
                        <PlusOutlined/>
                        <span style={{paddingLeft:5}}>并行阶段</span>
                    </div>
                </div>
            </div>
        </div>
    }

    // 多阶段 -- 每个模板阶段name
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

    // 多阶段 -- 模板下阶段name
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

    // 多阶段 -- 串行任务（上）
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

    // 多阶段 -- 串行任务（下）
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

    // 多阶段
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
                                                           { renderCode(stage) }
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

            <AddDrawer
                newStageDrawer={newStageDrawer}
                setNewStageDrawer={setNewStageDrawer}
            />

        </div>
    )
}

export default NewStage
