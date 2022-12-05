import React,{useState,Fragment} from "react";
import {Space} from "antd";
import AddDrawer from "./addDrawer";
import {PlusOutlined,ExclamationCircleOutlined,TagsOutlined,ShareAltOutlined} from "@ant-design/icons";
import SubIcon from "../../../common/components/subIcon";

const NewStage = props =>{

    const {formInitialValues,data,setTaskFormDrawer,validType,setDataItem,pipeline} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    
    const pipelineType = pipeline.pipelineType

    // +新任务
    const newTask = () =>{
        setNewStageDrawer(true)
    }

    // Form详情
    const showDetail = item =>{
        setDataItem(item)
        setTaskFormDrawer(true)
    }

    // 多任务 串行（上）
    const serialPre = item =>{
        setNewStageDrawer(true)
    }

    // 多任务 串行（下）
    const serialNext = item =>{
        setNewStageDrawer(true)
    }

    // 插入任务
    const insertData = (type,index) => {
        setNewStageDrawer(true)
    }

    // 效验提示
    const valid = configId =>{
        return validType && validType.some(item=>item==configId)
    }

    // 源码--地址和分支
    const renderCode = item =>{
        if(item.type < 10){
            const codeBranch = formInitialValues[item.configId+"_codeBranch"]
            return (
                <>
                    {
                        formInitialValues && formInitialValues[item.configId+"_codeName"] ?
                        <>
                            <div className="guiView_codeName">
                                <div className="branch-title">
                                    <TagsOutlined style={{paddingRight:5}}/>
                                    {formInitialValues[item.configId+"_codeName"]} 
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

    // 单任务的btn
    const renderSingleBtn = item =>{
        if(item.type>10){
            return (
                <div className="group-flow">
                    <div className="group-flow_singleBtn">
                        <svg className="icon group-flow_btn_i"
                            aria-hidden="true"
                            onClick={() =>insertData(item)}
                        >
                            <use xlinkHref="#icon-zengjia"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }

    // 单任务
    const renderSingleTask = item =>{
        return <Fragment key={item.configId}>
            {renderSingleBtn(item)}
            <div className="group-table">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages">
                    <div className="newStages-step">
                        <div className="newStages-content">
                            <div className={`newStages-job`}>
                                <div onClick={()=>showDetail(item)}
                                    className={`newStages-singleJob-content ${valid(item.configId)?"job-name":""} ${item.type<10?"newStages-job-code":""}`}
                                >
                                    <Space>
                                        <span className="newStages-job-title">
                                            <SubIcon type={item.type}/>
                                        </span>
                                        {valid(item.configId) &&
                                            <span className="newStages-job-warn">
                                            <ExclamationCircleOutlined />
                                        </span>
                                        }
                                    </Space>
                                </div>
                            </div>
                        </div>
                        {renderCode(item)}
                    </div>
                </div>
            </div>
        </Fragment>
    }


    // 多任务的btn
    const renderMultiBtn = item =>{
        if(item.type>10){
            return (
                <div className="group-flow">
                    <div className="group-flow_multiBtn">
                        <svg className="icon group-flow_btn_i"
                            aria-hidden="true"
                            onClick={() =>insertData(item)}
                        >
                            <use xlinkHref="#icon-zengjia"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }

    // 多任务
    const renderMultitask = item =>{
        return <Fragment key={item.configId}>
        {renderMultiBtn(item)}
        <div className="group-table">
            <div className="group-head">
                <div className="name" style={{opacity:0}}/>
            </div>
            <div className="newStages">
                <div className="newStages-step">
                    <div className="newStages-content">
                        <div className={`newStages-job ${item.type>10?"newStages-has":""} ${item.type<10?"newStages-job-code":""}`}>
                            {
                                item.type>10 &&
                                <div className="newStages-has-pre newStages-has-add" onClick={()=>serialPre(item)}>
                                    <svg className="icon has-add" aria-hidden="true">
                                        <use xlinkHref="#icon-zengjia"/>
                                    </svg>
                                </div>
                            }
                            <div onClick={()=>showDetail(item)}
                                 className={`newStages-job-content ${valid(item.configId)?"job-name":""} ${item.type<10?"newStages-job-code":""}`}
                            >
                                <Space>
                                    <span className="newStages-job-title">
                                        <SubIcon type={item.type}/>
                                    </span>
                                    {valid(item.configId) &&
                                        <span className="newStages-job-warn">
                                        <ExclamationCircleOutlined />
                                    </span>
                                    }
                                </Space>
                            </div>
                            {
                                item.type>10 &&
                                <div className="newStages-has-next newStages-has-add" onClick={()=>serialNext(item)}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-zengjia"/>
                                    </svg>
                                </div>
                            }  
                        </div>
                    </div>
                    {renderCode(item)}
                </div>
            </div>
        </div>
        </Fragment>
    }


    const render = () =>{
        if(data && data.length === 0){
            return null
        }
        else {
            return  <div className="group-flow">
                        <div className={`${pipelineType===1?"group-flow_singleBtn":"group-flow_multiBtn"}`} />
                    </div>
        }
    }

    return(
       <>
            {
                data && data.map(item =>{
                    return pipelineType===1?renderSingleTask(item):renderMultitask(item)
                })
            }
          
           {render()}
           <div className="group-create">
                <div className="group-head">
                    <div className="name" style={{opacity:0}}/>
                </div>
                <div className="newStages">
                    <div className="newStages-step"  >
                        <div className="newStages-content">
                            <div className="newStages-job">
                                <div onClick={()=>newTask()}
                                     className="newStages-singleJob-content"
                                >
                                    <PlusOutlined/>
                                    <span style={{paddingLeft:5}}>新任务</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <AddDrawer
               newStageDrawer={newStageDrawer}
               setNewStageDrawer={setNewStageDrawer}
           />
       </>
    )
}

export default NewStage