import React,{useState,Fragment} from "react";
import {Popconfirm} from "antd";
import {
    PlusOutlined,
    ExclamationCircleOutlined,
    TagsOutlined,
    ShareAltOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import SubIcon from "../../../common/components/subIcon";
import AddDrawer from "./addDrawer";

const NewStage = props =>{

    const {setTaskFormDrawer,setCreacteValue,data,validType,setDataItem,pipeline,deleteTaskConfig} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    
    const pipelineType = pipeline.type

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

    // 效验提示
    const valid = configId => validType && validType.some(item=>item==configId)

    // 源码--地址和分支
    const renderCode = item =>{
        if(item.type<10){
            const codeBranch = item && item.codeBranch
            return (
                <>
                    {
                        item && item.codeName ?
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
                        </>
                        :
                        null
                    }
                </>
            )
        }
    }

    const groupHead = (
        <div className="group-head">
            <div className="name" style={{opacity:0}}/>
        </div>
    )

    // 多任务（添加任务）；多阶段（添加阶段）
    const renderFlowBtn = (group,groupIndex) =>{
        return(
            <div className="group-flow">
                <div className={`group-flow_btn ${pipelineType===1?"group-flow_singleBtn":"group-flow_multiBtn"}`}>
                    <svg className="icon group-flow_btn_i"
                            aria-hidden="true"
                            onClick={() =>insertData(group,groupIndex)}
                    >
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </div>
        )
    } 

    const newJobContent = (item,deep) =>{
        return(
            <div onClick={()=>showDetail(item)}
                 style={{paddingLeft:deep}}
                 className={`newStages-job-content ${valid(item.configId)?"job-name":""} ${item.type<10?"newStages-job-code":""}`}
            >
                <div className="newStages-job-sub">
                    <span className="newStages-job-title">
                        <SubIcon type={item.type}/>
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
                {groupHead}
                <div className="newStages-single">
                    <div className={`newStages-job`}>
                        {newJobContent(group,14)}
                    </div>
                    { renderCode(group) }
                </div>
            </div>
        </Fragment>
    }

    // 并行任务添加按钮
    const parallel = (groupIndex) =>{
        return <div className="newStages-contents add-newStages-contents">
        <div className="newStages-content" style={{paddingLeft:30}}>
            <div className="newStages-job">
                <div className="newStages-job-content" onClick={()=>parallelTask(groupIndex)}>
                    <PlusOutlined/>
                    <span style={{paddingLeft:5}}>并行任务</span>
                </div>         
            </div>
        </div>
    </div>       
    }

    // 多阶段
    const renderMultitask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            {
                !group.code && renderFlowBtn(group,groupIndex)
            }
            <div className="group-table">
                {groupHead}
                <div className="newStages-multi">
                    {
                        group && group.stagesList && group.stagesList.map((list,listIndex)=>{
                            return(
                                <div className={`newStages-contents ${list.code?"newStages-code":""}`} key={listIndex}>
                                    <div className="newStages-content">
                                        {
                                            list && list.taskValues && list.taskValues.map((stage,stagesIndex)=>{
                                                return (
                                                    <div key={stagesIndex}>
                                                        <div className={`newStages-job ${!list.code?"newStages-has":""}`} >
                                                            { !list.code &&
                                                                <div className="newStages-has-add"
                                                                     style={{marginRight:15}}
                                                                     onClick={()=>serial(list,groupIndex,stagesIndex+1)}
                                                                 >
                                                                    <svg className="icon" aria-hidden="true">
                                                                        <use xlinkHref="#icon-zengjia"/>
                                                                    </svg>
                                                                </div>
                                                            }
                                                            { newJobContent(stage,20) }
                                                            { !list.code &&
                                                                <div className="newStages-has-add"
                                                                     style={{marginLeft:15}}
                                                                     onClick={()=>serial(list,groupIndex,stagesIndex+2)}
                                                                >
                                                                    <svg className="icon" aria-hidden="true">
                                                                        <use xlinkHref="#icon-zengjia"/>
                                                                    </svg>
                                                                </div>
                                                            }
                                                        </div>
                                                        { renderCode(stage) }
                                                    </div>
                                                )
                                            })
                                        }
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
                        {groupHead}
                        <div className="newStages-multi">
                            <div className="newStages-contents add-newStage">
                                <div className="newStages-content">
                                    <div className="newStages-job">
                                        <div onClick={()=>newTask()} className="newStages-job-content">
                                            <PlusOutlined/>
                                            <span style={{paddingLeft:5}}>新任务</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="group-create">
                    {groupHead}
                    <div className="newStages-multi">
                        <div className="newStages-job">
                            <div onClick={()=>newTask()} className="newStages-job-content">
                                <PlusOutlined/>
                                <span style={{paddingLeft:5}}>新任务</span>
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