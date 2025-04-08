/**
 * @Description: 多阶段查看视图
 * @Author: gaomengyuan
 * @Date: 2025/3/11
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{Fragment} from "react";
import {EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import {TaskIcon} from "./TaskCommon";
import ListEmpty from "../../../../../common/component/list/ListEmpty";

const StageView = props =>{

    const {stageList,stageStore,taskStore,setTaskFormDrawer} = props

    const {stageMustField} = stageStore
    const {setDataItem} = taskStore

    /**
     * task详情
     */
    const showDetail = (item,formType) =>{
        setDataItem({
            stageId:item.stageId,
            taskId:item.taskId,
            stageName:item.stageName,
            formType:formType,
        })
        setTaskFormDrawer(true)
    }

    //渲染多阶段
    const renderMultitask = (group,groupIndex) =>{
        return <Fragment key={groupIndex}>
            {
                !group.code &&
                <div className="group-flow" >
                    <div className="group-flow_btn group-flow_multiBtn">
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
                            const isLastClass = (groupIndex === stageList?.length-1) && group.stageList.length === 1;
                            return(
                               <div key={listIndex} className={`${!group.code?"multi-content":""} ${isLastClass ? 'view-last-content':''}`}>
                                   <div className={`newStages-contents ${group.code?"newStages-code":""}`}>
                                       <div className="newStages-content">
                                           {
                                               list && list.taskValues && list.taskValues.map((task,taskIndex)=>{
                                                   const valid = () => stageMustField && stageMustField.some(li=>li===task.taskId);
                                                   return (
                                                       <div key={taskIndex} className={`newStages-job ${!group.code?"":""}`} >
                                                           {
                                                               !group.code &&
                                                               <div className="newStages-has-add" style={{marginRight:15}}>
                                                               </div>
                                                           }
                                                           <div style={{paddingLeft:10}}
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
                                                               <div className="newStages-job-del">
                                                               </div>
                                                           </div>
                                                           {
                                                               !group.code &&
                                                               <div className="newStages-has-add newStages-has-add-right"
                                                                    style={{marginRight:15}}
                                                               >
                                                               </div>
                                                           }
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
                </div>
            </div>
        </Fragment>
    }

    return(
        <div className="guiView-main_group">
            {
                stageList?.length > 0 ? (
                    <>
                        {stageList.map((group,groupIndex) => renderMultitask(group,groupIndex))}
                    </>
                ) : (
                    <div className='arbess-home-limited'>
                        <ListEmpty />
                    </div>
                )
            }
        </div>
    )
}

export default inject("stageStore","taskStore")(observer(StageView))
