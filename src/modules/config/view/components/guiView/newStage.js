import React,{useState,Fragment} from "react";
import {Space,Popconfirm} from "antd";
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

    const {data,setTaskFormDrawer,validType,setDataItem,pipeline,deleteTaskConfig} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [taskSort,setTaskSort] = useState(0) // 添加新阶段的位置
    const [stages,setStages] = useState(0) // 阶段加入新任务
    const [stagesId,setStagesId] = useState("") // 阶段加入新任务
    
    const pipelineType = pipeline.type

    // +新任务
    const newTask = () =>{
        setTaskSort(data && data.length+1)
        setStages(0)
        setStagesId("")
        setNewStageDrawer(true)
    }

    // 多阶段 串行（上）
    const serialPre = (item,index,stagesIndex) =>{
        setStages(index+1)
        setStagesId(item.stagesId)
        setTaskSort(stagesIndex+1)
        setNewStageDrawer(true)
    }

    // 多阶段 串行（下）
    const serialNext = (item,index,stagesIndex) =>{
        setStages(index+1)
        setStagesId(item.stagesId)
        setTaskSort(stagesIndex+2)
        setNewStageDrawer(true)
    }

    // 插入任务
    const insertData = (item,index) => {
        setTaskSort(index+1)
        setStages(0)
        setStagesId("")
        setNewStageDrawer(true)
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
                            <div className="guiView_codeName">
                                <div className="branch-title">
                                    <TagsOutlined style={{paddingRight:5}}/>
                                    {item.codeName} 
                                </div>
                            </div>
                            <div className="guiView_branch ">
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

    // 多任务的btn
    const renderSingleBtn = (item,index) =>{
        return item.type > 10 &&
            <div className="group-flow">
                <div className="group-flow_singleBtn">
                    <svg className={`icon group-flow_btn_i`}
                        aria-hidden="true"
                        onClick={() =>insertData(item,index)}
                    >
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </div> 
    }

    // 多任务
    const renderSingleTask = (item,index) =>{
        return <Fragment key={index}>
            {renderSingleBtn(item,index)}
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className="newStages-step">
                        <div className="newStages-content">
                            <div className={`newStages-job`}>
                                <div onClick={()=>showDetail(item)}
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
                                        placement="topRight"
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
                            </div>
                        </div>
                        {renderCode(item)}
                    </div>
                </div>
            </div>
        </Fragment>
    }

    // 多阶段的btn
    const renderMultiBtn = (item,index) =>{
        return !item.code &&
            <div className="group-flow">
                <div className="group-flow_multiBtn">
                    <svg className={`icon group-flow_btn_i`}
                         aria-hidden="true"
                         onClick={() =>insertData(item,index)}
                    >
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </div>
    }

    // 多阶段
    const renderMultitask = (item,index) =>{
        return <Fragment key={index}>
        {renderMultiBtn(item,index)}
        <div className="group-table">
            <div className="group-head">
                <div className="name" style={{opacity:0}}/>
            </div>
            {
                item && item.taskValues && item.taskValues.map((stage,stagesIndex)=>{
                    return (
                    <div className="newStages-multi" key={stage.configId}>
                        <div className="newStages-step">
                            <div className="newStages-content">
                                <div className={`newStages-job ${stage.type>10?"newStages-has":""}`}>
                                    {
                                        stage.type>10 &&
                                        <div className="newStages-has-pre newStages-has-add" onClick={()=>serialPre(item,index,stagesIndex)}>
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-zengjia"/>
                                            </svg>
                                        </div>
                                    }
                                    <div onClick={()=>showDetail(stage)}
                                        className={`newStages-job-content ${valid(stage.configId)?"job-name":""} ${stage.type<10?"newStages-job-code":""}`}
                                    >
                                        <div className="newStages-job-sub">
                                            <span className="newStages-job-title">
                                                <SubIcon type={stage.type}/>
                                            </span>
                                        </div>
                                        {valid(stage.configId) &&
                                            <div className="newStages-job-warn">
                                                <ExclamationCircleOutlined />
                                            </div>
                                        }
                                        <Popconfirm
                                            placement="topRight"
                                            title="你确定删除吗"
                                            onConfirm={e=>deletePart(e,stage)}
                                            onCancel={e=>e.stopPropagation()}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <div className="newStages-job-del" onClick={e=>e.stopPropagation()}>
                                                <DeleteOutlined />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                    {
                                        stage.type>10 &&
                                        <div className="newStages-has-next newStages-has-add" onClick={()=>serialNext(item,index,stagesIndex)}>
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-zengjia"/>
                                            </svg>
                                        </div>
                                    }  
                                </div>
                            </div>
                            {renderCode(stage)}
                        </div>
                    </div>
                    )
                })
            }
        </div>
        </Fragment>
    }

    return(
       <>
            {
                data && data.map((item,index) =>{
                    return  pipeline && pipeline.type===1 ? renderSingleTask(item,index): renderMultitask(item,index)
                })
            }  
           {
                data && data.length>0 &&
                <div className="group-flow">
                    <div className={`${pipelineType===1?"group-flow_singleBtn":"group-flow_multiBtn"}`} />
                </div>
           }
            <div className="group-create">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages-single">
                    <div className="newStages-step"  >
                        <div className="newStages-content">
                            <div className="newStages-job">
                                <div onClick={()=>newTask()} className="newStages-job-content newStages-btn">
                                    <PlusOutlined/>
                                    <span style={{paddingLeft:5}}>新任务</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <AddDrawer
                stages={stages}
                stagesId={stagesId}
                taskSort={taskSort}
                newStageDrawer={newStageDrawer}
                setNewStageDrawer={setNewStageDrawer}
           />
       </>
    )
}

export default NewStage